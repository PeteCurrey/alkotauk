import { supabaseAdmin } from '../src/lib/supabase/server';

export const INITIAL_SUPPLIERS = [
  {
    slug: 'dual-pumps-uk',
    name: 'Dual Pumps Ltd',
    code: 'DP',
    supplier_type: 'distributor',
    account_number: 'ALK-DP-01',
    contact_name: 'Trade Support Team',
    email: 'sales@dualpumps.co.uk',
    phone: '01664 567226',
    website_url: 'https://dualpumps.co.uk',
    portal_url: 'https://dualpumps.co.uk/trade-login',
    default_margin_pct: 35.00,
    integration_method: 'csv',
    notes: 'Authorised UK master distributor of Interpump, PA, Hawk, Annovi Reverberi, and Steel Eagle surface cleaners. Also manufactures UK high-pressure manifolds, hose reels, and 12V/240V fuel transfer pumps.',
    active: true,
    sort_order: 1
  },
  {
    slug: 'steel-eagle-direct',
    name: 'Steel Eagle USA',
    code: 'SE',
    supplier_type: 'manufacturer',
    account_number: 'ALK-SE-01',
    contact_name: 'International OEM Sales',
    email: 'sales@steeleagle.com',
    phone: '+1 724 583 0100',
    website_url: 'https://steeleagle.com',
    portal_url: null,
    default_margin_pct: 40.00,
    integration_method: 'manual',
    notes: 'World leading manufacturer of commercial rotary surface cleaners, deck cleaners, and undercarriage spray systems. Uniontown, PA, USA.',
    active: true,
    sort_order: 2
  }
];

async function seed() {
  console.log('Seeding initial suppliers...');
  const { data, error } = await supabaseAdmin
    .from('suppliers')
    .upsert(INITIAL_SUPPLIERS, { onConflict: 'slug' })
    .select('id, slug, name, code');

  if (error) {
    console.error('Error seeding suppliers:', error.message);
    process.exit(1);
  }

  console.log('Suppliers seeded successfully:', data);
}

seed();
