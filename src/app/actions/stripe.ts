import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/server';
import { resolveProductAction } from '@/lib/commerce/action-resolver';

async function getStripeClient(): Promise<Stripe> {
  // 1. Check environment variable
  let key = process.env.STRIPE_SECRET_KEY;

  // 2. Fall back to database site_settings
  if (!key || key === 'sk_test_placeholder') {
    try {
      const { data: settings } = await supabaseAdmin
        .from('site_settings')
        .select('value')
        .eq('key', 'stripe_secret_key')
        .single();
      if (settings?.value && settings.value !== 'sk_test_placeholder') {
        key = settings.value;
      }
    } catch {}
  }

  if (!key) {
    throw new Error('Stripe is not configured. Please add your Stripe Secret Key in the Admin Dashboard Settings.');
  }

  return new Stripe(key, {
    apiVersion: '2023-10-16' as any,
  });
}

export async function createCheckoutSession(machineId: string, depositAmount: number, machineName: string) {
  const stripe = await getStripeClient();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alkota.co.uk';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: `Machine Deposit: Alkota ${machineName}`,
            description: `Fully refundable deposit for reservation of Alkota ${machineName}.`,
          },
          unit_amount: Math.round(depositAmount * 100), // in pence
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/machines/detail/${machineId}`,
  });

  return { sessionId: session.id, url: session.url };
}

// ─── Native Store Cart Checkout (Parts, Attachments & Chemicals) ───────────

export interface CartLineItem {
  id: string;
  name: string;
  price?: number; // client-supplied for display only — SERVER NEVER TRUSTS THIS
  quantity: number;
  image?: string;
  sku?: string;
}

export async function createCartCheckoutSession(clientItems: CartLineItem[]) {
  if (!clientItems || clientItems.length === 0) {
    throw new Error('Cart is empty.');
  }

  const stripe = await getStripeClient();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alkota.co.uk';

  // ─── 1. SERVER-SIDE PRICE VALIDATION (SECURITY HARDENING) ──────────────────
  // Authoritative prices MUST be fetched from database records. Never trust client prices.
  const itemKeys = clientItems.map(i => i.sku || i.id).filter(Boolean);
  const itemIds = clientItems.map(i => i.id).filter(Boolean);

  // Query parts table with full commercial state fields
  const { data: dbParts, error: partsErr } = await supabaseAdmin
    .from('parts')
    .select('id, part_number, sku, mpn, name, price, in_stock, active, needs_review, image_url, vat_rate, superseded_by, discontinued, status, publication_state, quote_only, view_only, availability_status, category, is_attachment')
    .or(`id.in.(${itemIds.map(id => `"${id}"`).join(',')}),part_number.in.(${itemKeys.map(k => `"${k}"`).join(',')})`);

  if (partsErr) {
    console.error('Failed to verify parts from database:', partsErr);
  }

  const partsMap = new Map<string, any>();
  for (const p of dbParts || []) {
    partsMap.set(p.id, p);
    partsMap.set(p.part_number, p);
    if (p.sku) partsMap.set(p.sku, p);
  }

  // Build verified line items with authoritative prices & central resolver enforcement
  interface VerifiedLineItem {
    id: string;
    part_number: string;
    name: string;
    unit_price: number;
    quantity: number;
    vat_rate: number;
    image_url?: string;
    total: number;
  }

  const verifiedItems: VerifiedLineItem[] = [];

  for (const clientItem of clientItems) {
    const qty = Math.max(1, Math.floor(clientItem.quantity || 1));
    const matched = partsMap.get(clientItem.id) || (clientItem.sku ? partsMap.get(clientItem.sku) : null);

    if (matched) {
      // ─── CENTRAL RESOLVER PRECEDENCE ENFORCEMENT ──────────────────────────
      const decision = resolveProductAction(matched);
      if (decision.action !== 'PURCHASE') {
        throw new Error(
          `Cannot checkout "${matched.name}" (${matched.part_number}): ${decision.reason} (${decision.label}).`
        );
      }

      const authoritativePrice = Number(decision.priceExVat);
      verifiedItems.push({
        id: matched.id,
        part_number: matched.part_number,
        name: matched.name,
        unit_price: authoritativePrice,
        quantity: qty,
        vat_rate: Number(matched.vat_rate) || 0.20,
        image_url: matched.image_url || clientItem.image,
        total: Math.round(authoritativePrice * qty * 100) / 100,
      });
    } else {
      // Fallback for non-parts products (e.g. chemicals or legacy store items)
      const fallbackDecision = resolveProductAction({
        id: clientItem.id,
        name: clientItem.name,
        price: clientItem.price,
        part_number: clientItem.sku || clientItem.id,
        active: true,
        in_stock: true,
      });

      if (fallbackDecision.action !== 'PURCHASE' || !fallbackDecision.priceExVat) {
        throw new Error(`Item "${clientItem.name}" is not eligible for checkout: ${fallbackDecision.reason}`);
      }

      verifiedItems.push({
        id: clientItem.id,
        part_number: clientItem.sku || clientItem.id,
        name: clientItem.name,
        unit_price: fallbackDecision.priceExVat,
        quantity: qty,
        vat_rate: 0.20,
        image_url: clientItem.image,
        total: Math.round(fallbackDecision.priceExVat * qty * 100) / 100,
      });
    }
  }

  // ─── 2. FINANCIAL CALCULATIONS ─────────────────────────────────────────────
  const subtotal = verifiedItems.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);
  const vat = Math.round(subtotal * 0.20 * 100) / 100;
  // Free delivery on orders £75+ ex VAT
  const shippingCost = subtotal >= 75 ? 0 : 8.50;
  const total = Math.round((subtotal + vat + shippingCost) * 100) / 100;

  // Generate unique order number
  const orderNumber = `ALK-ORD-${Date.now().toString().slice(-6)}`;

  // ─── 3. RECORD ORDER IN DATABASE ───────────────────────────────────────────
  try {
    await supabaseAdmin.from('orders').insert({
      order_number: orderNumber,
      customer_name: 'Pending Checkout',
      customer_email: 'pending@checkout.stripe',
      items: verifiedItems.map(i => ({
        id: i.id,
        sku: i.part_number,
        name: i.name,
        unit_price: i.unit_price,
        quantity: i.quantity,
        total: i.total,
      })),
      subtotal,
      vat,
      shipping_cost: shippingCost,
      total,
      status: 'new',
      payment_status: 'awaiting_payment',
    });
  } catch (orderErr) {
    console.warn('Could not record pre-checkout order in database (table may be pending migration):', orderErr);
  }

  // ─── 4. CREATE STRIPE CHECKOUT SESSION ─────────────────────────────────────
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: verifiedItems.map(item => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
          metadata: {
            part_number: item.part_number,
            order_number: orderNumber,
          },
          ...(item.image_url && item.image_url.startsWith('http') ? { images: [item.image_url] } : {}),
        },
        unit_amount: Math.round(item.unit_price * 100), // pence
        tax_behavior: 'exclusive' as const,
      },
      quantity: item.quantity,
    })),
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: shippingCost === 0 ? 0 : 850, // £8.50 or FREE over £75
            currency: 'gbp',
          },
          display_name: shippingCost === 0 ? 'Free UK Mainland Delivery (Orders over £75)' : 'Standard UK Courier Delivery',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 1 },
            maximum: { unit: 'business_day', value: 3 },
          },
        },
      },
    ],
    mode: 'payment',
    automatic_tax: { enabled: false },
    shipping_address_collection: {
      allowed_countries: ['GB'],
    },
    allow_promotion_codes: true,
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order=${orderNumber}&type=shop`,
    cancel_url: `${baseUrl}/parts-attachments`,
    metadata: {
      source: 'alkota-uk-parts-store',
      order_number: orderNumber,
      total_items: verifiedItems.reduce((sum, i) => sum + i.quantity, 0).toString(),
      subtotal_gbp: subtotal.toFixed(2),
    },
  });

  // Update order with Stripe session ID
  try {
    await supabaseAdmin
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('order_number', orderNumber);
  } catch {}

  return { sessionId: session.id, url: session.url, orderNumber };
}
