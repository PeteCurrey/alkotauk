import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/server';

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
  price: number;
  quantity: number;
  image?: string;
  sku?: string;
}

export async function createCartCheckoutSession(items: CartLineItem[]) {
  if (!items || items.length === 0) {
    throw new Error('Cart is empty.');
  }

  const stripe = await getStripeClient();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alkota.co.uk';

  // Calculate subtotal
  const subtotal = items.reduce((sum, i) => sum + (Number(i.price) || 0) * i.quantity, 0);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
          ...(item.sku ? { metadata: { sku: item.sku } } : {}),
          ...(item.image && item.image.startsWith('http') ? { images: [item.image] } : {}),
        },
        unit_amount: Math.round(Number(item.price) * 100), // pence
        tax_behavior: 'exclusive' as const,
      },
      quantity: item.quantity,
    })),
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: subtotal >= 75 ? 0 : 850, // £8.50 or FREE over £75
            currency: 'gbp',
          },
          display_name: subtotal >= 75 ? 'Free UK Mainland Delivery' : 'Standard UK Courier Delivery',
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
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&type=shop`,
    cancel_url: `${baseUrl}/parts-attachments`,
    metadata: {
      source: 'alkota-uk-parts-store',
      total_items: items.reduce((sum, i) => sum + i.quantity, 0).toString(),
    },
  });

  return { sessionId: session.id, url: session.url };
}
