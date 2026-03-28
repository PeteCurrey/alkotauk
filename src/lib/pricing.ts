/**
 * Alkota UK Dealer Pricing Logic
 */

export type DealerTier = 'gold' | 'silver' | 'bronze';

export const DEALER_DISCOUNTS: Record<DealerTier | string, number> = {
  gold: 0.25,   // 25% discount
  silver: 0.15, // 15% discount
  bronze: 0.10, // 10% discount
};

/**
 * Calculates the dealer price for a given base price and tier.
 * @param basePrice The RRP/Base price (Excl. VAT)
 * @param tier The dealer's tier
 * @returns The discounted dealer price
 */
export function calculateDealerPrice(basePrice: number, tier: DealerTier | string = 'bronze'): number {
  const discount = DEALER_DISCOUNTS[tier] || 0;
  return basePrice * (1 - discount);
}

/**
 * Formats a number as GBP currency.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}
