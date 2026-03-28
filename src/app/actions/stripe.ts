'use server';

import Stripe from 'stripe';
import { client } from '@/sanity/client';

export async function createCheckoutSession(machineId: string, depositAmount: number, machineName: string) {
  // Fetch Stripe Secret Key from Sanity siteSettings
  const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]`);
  const stripeSecretKey = siteSettings?.stripeGroup?.stripeSecretKey;

  if (!stripeSecretKey) {
    throw new Error('Stripe Secret Key not found in Site Settings.');
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2023-10-16' as any,
  });

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
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}/machines/detail/${machineId}`,
  });

  return { sessionId: session.id, url: session.url };
}

// ─── Native Shop Cart Checkout ─────────────────────────────────────────────

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

  const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]`);
  const stripeSecretKey = siteSettings?.stripeGroup?.stripeSecretKey;

  if (!stripeSecretKey || stripeSecretKey === 'sk_test_placeholder') {
    throw new Error('Stripe is not configured. Add your Secret Key in Sanity CMS → Site Settings → Stripe.');
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2023-10-16' as any,
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
          ...(item.sku ? { metadata: { sku: item.sku } } : {}),
          ...(item.image ? { images: [item.image] } : {}),
        },
        unit_amount: Math.round(item.price * 100), // pence
        tax_behavior: 'exclusive' as const,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    automatic_tax: { enabled: false },
    shipping_address_collection: {
      allowed_countries: ['GB'],
    },
    allow_promotion_codes: true,
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&type=shop`,
    cancel_url: `${baseUrl}/shop`,
    metadata: {
      source: 'alkota-uk-shop',
    },
  });

  return { sessionId: session.id, url: session.url };
}
