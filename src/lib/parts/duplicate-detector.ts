import { Part, StagedSupplierProduct } from '../types/parts';

export interface DuplicateMatchResult {
  isDuplicate: boolean;
  matchedPartId: string | null;
  matchConfidence: number; // 0.00 - 1.00
  matchReason: string;
}

export function normalizePartNumber(pn: string | null | undefined): string {
  if (!pn) return '';
  return pn.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function normalizeTitle(title: string | null | undefined): string {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function detectDuplicate(
  rawItem: {
    supplierSku: string;
    rawTitle: string;
    rawBrand?: string | null;
    rawMpn?: string | null;
  },
  existingParts: Part[]
): DuplicateMatchResult {
  const normRawMpn = normalizePartNumber(rawItem.rawMpn || rawItem.supplierSku);
  const normRawSku = normalizePartNumber(rawItem.supplierSku);
  const normRawTitle = normalizeTitle(rawItem.rawTitle);
  const rawBrand = (rawItem.rawBrand || '').toLowerCase().trim();

  // 1. Direct MPN or Part Number exact normalized match
  for (const part of existingParts) {
    const normPartNumber = normalizePartNumber(part.part_number);
    const normPartMpn = normalizePartNumber(part.mpn);
    const normPartSku = normalizePartNumber(part.sku);

    if (normRawMpn && (normRawMpn === normPartNumber || normRawMpn === normPartMpn)) {
      return {
        isDuplicate: true,
        matchedPartId: part.id,
        matchConfidence: 0.98,
        matchReason: `Exact Manufacturer Part Number Match (${part.part_number})`,
      };
    }

    if (normRawSku && (normRawSku === normPartSku || normRawSku === normPartNumber)) {
      return {
        isDuplicate: true,
        matchedPartId: part.id,
        matchConfidence: 0.95,
        matchReason: `Exact SKU Match (${part.sku || part.part_number})`,
      };
    }
  }

  // 2. Brand Match + High Title Similarity
  if (rawBrand) {
    for (const part of existingParts) {
      const partBrand = (part.brand || part.manufacturer || '').toLowerCase().trim();
      if (partBrand && (partBrand.includes(rawBrand) || rawBrand.includes(partBrand))) {
        const normPartTitle = normalizeTitle(part.name);
        
        // Exact normalized name match within same brand
        if (normRawTitle === normPartTitle) {
          return {
            isDuplicate: true,
            matchedPartId: part.id,
            matchConfidence: 0.90,
            matchReason: `Exact Title & Brand Match under ${part.brand}`,
          };
        }

        // Token overlap
        const rawTokens = new Set(normRawTitle.split(' '));
        const partTokens = new Set(normPartTitle.split(' '));
        let common = 0;
        rawTokens.forEach(t => {
          if (partTokens.has(t) && t.length > 2) common++;
        });

        const overlapScore = (2 * common) / (rawTokens.size + partTokens.size);
        if (overlapScore > 0.75) {
          return {
            isDuplicate: true,
            matchedPartId: part.id,
            matchConfidence: Number(overlapScore.toFixed(2)),
            matchReason: `High Title Similarity (${Math.round(overlapScore * 100)}%) under ${part.brand}`,
          };
        }
      }
    }
  }

  // 3. No confident duplicate found
  return {
    isDuplicate: false,
    matchedPartId: null,
    matchConfidence: 0.0,
    matchReason: 'Unique product — no catalogue duplicates detected',
  };
}
