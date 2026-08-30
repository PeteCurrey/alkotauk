export interface PricingCalculationInput {
  costPrice?: number | null;
  retailPriceOverride?: number | null;
  marginOverridePct?: number | null;
  defaultMarginPct?: number; // e.g. 35.0 (%)
  vatRate?: number; // default 0.20
  tradeDiscountPct?: number; // e.g. 15.0 (%)
}

export interface PricingBreakdown {
  costPrice: number | null;
  calculatedRetailExVat: number | null;
  calculatedRetailIncVat: number | null;
  tradePriceExVat: number | null;
  tradePriceIncVat: number | null;
  effectiveMarginPct: number;
  vatRate: number;
  isPoa: boolean;
}

export function calculatePricing({
  costPrice,
  retailPriceOverride,
  marginOverridePct,
  defaultMarginPct = 35.0,
  vatRate = 0.20,
  tradeDiscountPct = 15.0,
}: PricingCalculationInput): PricingBreakdown {
  // If explicitly overridden with retail price
  if (typeof retailPriceOverride === 'number' && retailPriceOverride > 0) {
    const retailEx = retailPriceOverride;
    const retailInc = retailEx * (1 + vatRate);
    const tradeEx = retailEx * (1 - tradeDiscountPct / 100);
    const tradeInc = tradeEx * (1 + vatRate);
    
    let margin = 0;
    if (costPrice && costPrice > 0) {
      margin = ((retailEx - costPrice) / retailEx) * 100;
    }

    return {
      costPrice: costPrice ?? null,
      calculatedRetailExVat: Number(retailEx.toFixed(2)),
      calculatedRetailIncVat: Number(retailInc.toFixed(2)),
      tradePriceExVat: Number(tradeEx.toFixed(2)),
      tradePriceIncVat: Number(tradeInc.toFixed(2)),
      effectiveMarginPct: Number(margin.toFixed(1)),
      vatRate,
      isPoa: false,
    };
  }

  // If cost price provided, calculate via margin rule
  if (typeof costPrice === 'number' && costPrice > 0) {
    const margin = marginOverridePct ?? defaultMarginPct;
    // Commercial margin formula: Retail = Cost / (1 - Margin/100)
    const marginFraction = Math.min(Math.max(margin / 100, 0), 0.95); // prevent divide by zero
    const retailEx = costPrice / (1 - marginFraction);
    const retailInc = retailEx * (1 + vatRate);
    const tradeEx = retailEx * (1 - tradeDiscountPct / 100);
    const tradeInc = tradeEx * (1 + vatRate);

    return {
      costPrice,
      calculatedRetailExVat: Number(retailEx.toFixed(2)),
      calculatedRetailIncVat: Number(retailInc.toFixed(2)),
      tradePriceExVat: Number(tradeEx.toFixed(2)),
      tradePriceIncVat: Number(tradeInc.toFixed(2)),
      effectiveMarginPct: Number(margin.toFixed(1)),
      vatRate,
      isPoa: false,
    };
  }

  // Otherwise POA (Price on Application)
  return {
    costPrice: null,
    calculatedRetailExVat: null,
    calculatedRetailIncVat: null,
    tradePriceExVat: null,
    tradePriceIncVat: null,
    effectiveMarginPct: 0,
    vatRate,
    isPoa: true,
  };
}

export function formatPrice(
  amount: number | null | undefined,
  options: { includeVat?: boolean; prefix?: string; poaText?: string } = {}
): string {
  const { includeVat = false, prefix = '£', poaText = 'POA' } = options;
  if (amount === null || amount === undefined || isNaN(amount)) {
    return poaText;
  }
  const val = includeVat ? amount * 1.20 : amount;
  return `${prefix}${val.toFixed(2)}`;
}
