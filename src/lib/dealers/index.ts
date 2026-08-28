import { supabaseAdmin } from '@/lib/supabase/server';
import canonicalDealers from '../../../scripts/data/dealers-canonical-seed.json';
import { geocodePostcode, calculateHaversineDistance, extractPostcodeArea } from './geo';

export interface DealerService {
  service_key: string;
  service_name: string;
}

export interface DealerTerritory {
  postcode_prefix: string;
  county_name?: string;
  region_name: string;
}

export interface DealerOpeningHours {
  mon_fri: string;
  sat: string;
  sun: string;
}

export interface Dealer {
  id: string;
  slug: string;
  name: string;
  status: 'active' | 'inactive' | 'draft';
  tier: 'authorised' | 'service_centre' | 'specialist_partner' | 'national_hub';
  description?: string;
  short_description?: string;
  logo_url?: string | null;
  hero_image_url?: string | null;
  address_line1: string;
  address_line2?: string | null;
  town: string;
  county: string;
  postcode: string;
  country: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  website?: string | null;
  opening_hours?: DealerOpeningHours;
  emergency_support: boolean;
  mobile_service_vans: number;
  demonstration_facility: boolean;
  featured: boolean;
  rating: number;
  sort_order: number;
  distance_miles?: number;
  services?: DealerService[];
  territories?: DealerTerritory[];
  product_categories?: string[];
}

export interface DealerLeadPayload {
  dealer_id?: string;
  customer_name: string;
  customer_company?: string;
  customer_email: string;
  customer_phone: string;
  customer_postcode: string;
  customer_town?: string;
  lead_type?: 'quote' | 'demo' | 'service' | 'general';
  product_slug?: string;
  product_name?: string;
  product_category?: string;
  industry_slug?: string;
  application_notes?: string;
  message?: string;
  source_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

/**
 * Retrieves all active dealers (Database-first with fallback to canonical snapshot).
 */
export async function getDealers(options?: { onlyActive?: boolean }): Promise<Dealer[]> {
  try {
    let query = supabaseAdmin
      .from('dealers')
      .select(`
        *,
        services:dealer_services(service_key, service_name),
        territories:dealer_territories(postcode_prefix, county_name, region_name),
        product_categories:dealer_product_categories(category_slug)
      `)
      .order('sort_order', { ascending: true });

    if (options?.onlyActive !== false) {
      query = query.eq('status', 'active');
    }

    const { data, error } = await query;

    if (!error && data && data.length > 0) {
      return data.map((d: any) => ({
        ...d,
        latitude: parseFloat(d.latitude),
        longitude: parseFloat(d.longitude),
        rating: parseFloat(d.rating || '4.9'),
        services: d.services || [],
        territories: d.territories || [],
        product_categories: (d.product_categories || []).map((c: any) => c.category_slug || c),
      }));
    }
  } catch (err) {
    console.warn('getDealers: Falling back to canonical seed snapshot');
  }

  // Fallback snapshot
  const snapshot = canonicalDealers as any[];
  if (options?.onlyActive !== false) {
    return snapshot.filter((d) => d.status === 'active');
  }
  return snapshot;
}

/**
 * Retrieves a single dealer by slug.
 */
export async function getDealerBySlug(slug: string): Promise<Dealer | null> {
  const dealers = await getDealers({ onlyActive: false });
  const found = dealers.find((d) => d.slug === slug);
  return found || null;
}

/**
 * Searches and ranks dealers by distance from a user's location or postcode.
 */
export async function findDealersByLocation(params: {
  postcode?: string;
  lat?: number;
  lng?: number;
  serviceFilter?: string;
  categoryFilter?: string;
  maxDistanceMiles?: number;
}): Promise<{ dealers: Dealer[]; searchLocation?: { lat: number; lng: number; postcode: string } }> {
  const allDealers = await getDealers({ onlyActive: true });
  let userLat = params.lat;
  let userLng = params.lng;
  let cleanPostcode = params.postcode?.trim().toUpperCase();

  // If postcode provided, geocode it
  if (cleanPostcode && (!userLat || !userLng)) {
    const coords = geocodePostcode(cleanPostcode);
    if (coords) {
      userLat = coords.latitude;
      userLng = coords.longitude;
    }
  }

  let filtered = allDealers;

  // Filter by service capability
  if (params.serviceFilter && params.serviceFilter !== 'all') {
    filtered = filtered.filter((d) =>
      d.services?.some((s) => s.service_key === params.serviceFilter)
    );
  }

  // Filter by product category specialism
  if (params.categoryFilter && params.categoryFilter !== 'all') {
    filtered = filtered.filter((d) =>
      d.product_categories?.includes(params.categoryFilter!)
    );
  }

  // Calculate distance for all dealers
  if (userLat && userLng) {
    filtered = filtered.map((dealer) => {
      const distance = calculateHaversineDistance(
        userLat!,
        userLng!,
        dealer.latitude,
        dealer.longitude
      );
      return {
        ...dealer,
        distance_miles: distance,
      };
    });

    // Territory-priority ranking: check if dealer holds authoritative territory for this postcode
    const prefix = cleanPostcode ? extractPostcodeArea(cleanPostcode) : null;

    filtered.sort((a, b) => {
      const aIsTerritory = prefix ? a.territories?.some((t) => t.postcode_prefix === prefix) : false;
      const bIsTerritory = prefix ? b.territories?.some((t) => t.postcode_prefix === prefix) : false;

      if (aIsTerritory && !bIsTerritory) return -1;
      if (!aIsTerritory && bIsTerritory) return 1;

      return (a.distance_miles || 9999) - (b.distance_miles || 9999);
    });

    if (params.maxDistanceMiles) {
      filtered = filtered.filter((d) => (d.distance_miles || 0) <= params.maxDistanceMiles!);
    }
  }

  return {
    dealers: filtered,
    searchLocation:
      userLat && userLng
        ? { lat: userLat, lng: userLng, postcode: cleanPostcode || '' }
        : undefined,
  };
}
