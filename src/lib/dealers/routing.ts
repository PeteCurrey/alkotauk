import { supabaseAdmin } from '@/lib/supabase/server';
import { getDealers, Dealer, DealerLeadPayload } from './index';
import { geocodePostcode, calculateHaversineDistance, extractPostcodeArea } from './geo';

export interface LeadRoutingResult {
  success: boolean;
  leadId?: string;
  matchedDealer: Dealer;
  routedVia: 'territory_match' | 'proximity_match' | 'direct_dealer' | 'fallback_hq';
  distanceMiles?: number;
  message: string;
}

/**
 * Universal Server-Side Lead Routing Engine.
 * Evaluates Postcode + Product + Service + Geography -> Authorised Dealer -> Alkota UK Fallback.
 */
export async function routeLead(payload: DealerLeadPayload): Promise<LeadRoutingResult> {
  const allDealers = await getDealers({ onlyActive: true });
  const hqDealer =
    allDealers.find((d) => d.tier === 'national_hub') || allDealers[0];

  let matchedDealer: Dealer = hqDealer;
  let routedVia: 'territory_match' | 'proximity_match' | 'direct_dealer' | 'fallback_hq' =
    'fallback_hq';
  let calculatedDistance: number | undefined = undefined;

  // 1. Direct Dealer Assignment (Customer explicitly chose a dealer profile)
  if (payload.dealer_id) {
    const direct = allDealers.find((d) => d.id === payload.dealer_id);
    if (direct) {
      matchedDealer = direct;
      routedVia = 'direct_dealer';
    }
  }

  // 2. Territory-Based Routing (Postcode prefix match)
  if (routedVia === 'fallback_hq' && payload.customer_postcode) {
    const prefix = extractPostcodeArea(payload.customer_postcode);

    if (prefix) {
      const territoryMatch = allDealers.find(
        (d) =>
          d.tier !== 'national_hub' &&
          d.territories?.some((t) => t.postcode_prefix === prefix)
      );

      if (territoryMatch) {
        matchedDealer = territoryMatch;
        routedVia = 'territory_match';
      }
    }
  }

  // 3. Proximity-Based Routing (Closest dealer within UK territory)
  if (routedVia === 'fallback_hq' && payload.customer_postcode) {
    const coords = geocodePostcode(payload.customer_postcode);

    if (coords) {
      const dealersWithDist = allDealers
        .filter((d) => d.tier !== 'national_hub')
        .map((d) => ({
          dealer: d,
          dist: calculateHaversineDistance(
            coords.latitude,
            coords.longitude,
            d.latitude,
            d.longitude
          ),
        }))
        .sort((a, b) => a.dist - b.dist);

      if (dealersWithDist.length > 0 && dealersWithDist[0].dist <= 150) {
        matchedDealer = dealersWithDist[0].dealer;
        routedVia = 'proximity_match';
        calculatedDistance = dealersWithDist[0].dist;
      }
    }
  }

  // Calculate distance to matched dealer if we have coordinates
  if (payload.customer_postcode && !calculatedDistance) {
    const coords = geocodePostcode(payload.customer_postcode);
    if (coords) {
      calculatedDistance = calculateHaversineDistance(
        coords.latitude,
        coords.longitude,
        matchedDealer.latitude,
        matchedDealer.longitude
      );
    }
  }

  // Save Lead to Supabase database
  let savedLeadId: string | undefined = undefined;
  try {
    const { data, error } = await supabaseAdmin
      .from('dealer_leads')
      .insert({
        dealer_id: matchedDealer.id,
        customer_name: payload.customer_name,
        customer_company: payload.customer_company || null,
        customer_email: payload.customer_email,
        customer_phone: payload.customer_phone,
        customer_postcode: payload.customer_postcode,
        customer_town: payload.customer_town || null,
        lead_type: payload.lead_type || 'quote',
        product_slug: payload.product_slug || null,
        product_name: payload.product_name || null,
        product_category: payload.product_category || null,
        industry_slug: payload.industry_slug || null,
        application_notes: payload.application_notes || null,
        message: payload.message || null,
        status: 'new',
        routed_via: routedVia,
        routing_distance_miles: calculatedDistance || null,
        source_url: payload.source_url || null,
        utm_source: payload.utm_source || null,
        utm_medium: payload.utm_medium || null,
        utm_campaign: payload.utm_campaign || null,
      })
      .select('id')
      .single();

    if (!error && data) {
      savedLeadId = data.id;
    }
  } catch (err) {
    console.error('routeLead: Error saving lead to database:', err);
  }

  // Send Notification Email via Resend if API Key is configured
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d0d; color: #fff; padding: 24px;">
          <div style="border-bottom: 2px solid #ff6900; padding-bottom: 12px; margin-bottom: 20px;">
            <h1 style="color: #ff6900; margin: 0; font-size: 20px; text-transform: uppercase;">
              ALKOTA UK — NEW ROUTED ${payload.lead_type?.toUpperCase() || 'COMMERCIAL'} ENQUIRY
            </h1>
            <p style="color: #888; font-size: 11px; margin: 4px 0 0 0;">
              Assigned to: <strong>${matchedDealer.name}</strong> (${routedVia})
            </p>
          </div>

          <div style="background: #191919; padding: 16px; margin-bottom: 16px; border-left: 3px solid #ff6900;">
            <h2 style="color: #fff; font-size: 13px; text-transform: uppercase; margin: 0 0 10px 0;">Customer Contact</h2>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Name:</strong> ${payload.customer_name}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Company:</strong> ${payload.customer_company || 'Not provided'}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Email:</strong> <a href="mailto:${payload.customer_email}" style="color: #ff6900;">${payload.customer_email}</a></p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Phone:</strong> <a href="tel:${payload.customer_phone}" style="color: #ff6900;">${payload.customer_phone}</a></p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Postcode:</strong> ${payload.customer_postcode} ${calculatedDistance ? `(${calculatedDistance} miles from dealer)` : ''}</p>
          </div>

          ${payload.product_name || payload.product_category ? `
            <div style="background: #191919; padding: 16px; margin-bottom: 16px;">
              <h2 style="color: #fff; font-size: 13px; text-transform: uppercase; margin: 0 0 10px 0;">Equipment Context</h2>
              ${payload.product_name ? `<p style="margin: 4px 0; font-size: 13px;"><strong>Machine:</strong> ${payload.product_name}</p>` : ''}
              ${payload.product_category ? `<p style="margin: 4px 0; font-size: 13px;"><strong>Category:</strong> ${payload.product_category}</p>` : ''}
              ${payload.industry_slug ? `<p style="margin: 4px 0; font-size: 13px;"><strong>Industry:</strong> ${payload.industry_slug}</p>` : ''}
            </div>
          ` : ''}

          ${payload.message ? `
            <div style="background: #191919; padding: 16px; margin-bottom: 16px;">
              <h2 style="color: #fff; font-size: 13px; text-transform: uppercase; margin: 0 0 10px 0;">Requirements Note</h2>
              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #ddd;">${payload.message}</p>
            </div>
          ` : ''}

          <div style="font-size: 10px; color: #666; text-align: center; margin-top: 24px; border-top: 1px solid #222; padding-top: 12px;">
            Alkota UK Lead Routing Engine • alkota.co.uk
          </div>
        </div>
      `;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Alkota UK Dealer Network <enquiries@alkota.co.uk>',
          to: ['sales@alkota.co.uk'],
          reply_to: payload.customer_email,
          subject: `[Alkota Dealer Lead] ${payload.customer_name} — ${matchedDealer.name} (${payload.customer_postcode})`,
          html: emailHtml,
        }),
      });
    } catch (mailErr) {
      console.error('routeLead: Error dispatching notification email:', mailErr);
    }
  }

  return {
    success: true,
    leadId: savedLeadId,
    matchedDealer,
    routedVia,
    distanceMiles: calculatedDistance,
    message: `Your enquiry has been routed to ${matchedDealer.name}, your authorised local Alkota technical partner.`,
  };
}
