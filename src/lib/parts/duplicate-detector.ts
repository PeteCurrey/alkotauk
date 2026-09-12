import { Part } from '../types/parts';

export interface DuplicateMatchResult {
  isDuplicate: boolean;
  isPotentialMatch?: boolean;
  matchedPartId: string | null;
  matchedPartNumber?: string | null;
  matchConfidence: number; // 0.00 - 1.00
  matchReason: string;
  matchStrategy: 'mpn_exact' | 'manufacturer_mpn' | 'supplier_sku' | 'supplier_relation' | 'sku_mapping' | 'normalized_id' | 'title_similarity_review' | 'none';
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

/**
 * Hierarchical matching engine:
 * 1. Manufacturer Part Number (Exact)
 * 2. Manufacturer + MPN
 * 3. Supplier Part Number (matches existing part.sku or part_number)
 * 4. Existing supplier relationship mapping
 * 5. SKU mapping
 * 6. Exact normalised product identifier
 * 7. Controlled secondary matching (surfaced for Admin Review only; NEVER auto-merged)
 */
export function detectDuplicate(
  rawItem: {
    supplierSku: string;
    rawTitle: string;
    rawBrand?: string | null;
    rawManufacturer?: string | null;
    rawMpn?: string | null;
  },
  existingParts: Part[],
  existingSupplierMappings?: Map<string, string> // supplier_sku -> part_id
): DuplicateMatchResult {
  const normRawMpn = normalizePartNumber(rawItem.rawMpn);
  const normRawSku = normalizePartNumber(rawItem.supplierSku);
  const rawManufacturer = (rawItem.rawManufacturer || rawItem.rawBrand || '').toLowerCase().trim();

  // 1. Exact Manufacturer Part Number (MPN) Match
  if (normRawMpn) {
    for (const part of existingParts) {
      const normPartMpn = normalizePartNumber(part.mpn);
      if (normPartMpn && normPartMpn === normRawMpn) {
        return {
          isDuplicate: true,
          matchedPartId: part.id,
          matchedPartNumber: part.part_number,
          matchConfidence: 0.99,
          matchReason: `Exact Manufacturer Part Number Match (MPN: ${part.mpn})`,
          matchStrategy: 'mpn_exact',
        };
      }
    }
  }

  // 2. Manufacturer + MPN Match
  if (normRawMpn && rawManufacturer) {
    for (const part of existingParts) {
      const partManuf = (part.manufacturer || part.brand || '').toLowerCase().trim();
      const normPartMpn = normalizePartNumber(part.mpn || part.part_number);
      if (partManuf && (partManuf.includes(rawManufacturer) || rawManufacturer.includes(partManuf))) {
        if (normPartMpn && normPartMpn === normRawMpn) {
          return {
            isDuplicate: true,
            matchedPartId: part.id,
            matchedPartNumber: part.part_number,
            matchConfidence: 0.98,
            matchReason: `Manufacturer + MPN Match (${part.manufacturer || part.brand} · ${normRawMpn})`,
            matchStrategy: 'manufacturer_mpn',
          };
        }
      }
    }
  }

  // 3. Existing Supplier Relationship Mapping (supplier_id + supplier_sku -> part_id)
  if (existingSupplierMappings && rawItem.supplierSku) {
    const matchedPartId = existingSupplierMappings.get(rawItem.supplierSku);
    if (matchedPartId) {
      const matchedPart = existingParts.find(p => p.id === matchedPartId);
      return {
        isDuplicate: true,
        matchedPartId,
        matchedPartNumber: matchedPart?.part_number,
        matchConfidence: 0.96,
        matchReason: `Existing Supplier Relationship (Supplier SKU: ${rawItem.supplierSku})`,
        matchStrategy: 'supplier_relation',
      };
    }
  }

  // 4. Supplier Part Number Match (against existing part.sku or part.part_number)
  if (normRawSku) {
    for (const part of existingParts) {
      const normPartSku = normalizePartNumber(part.sku);
      const normPartNumber = normalizePartNumber(part.part_number);
      if (normRawSku === normPartSku || normRawSku === normPartNumber) {
        return {
          isDuplicate: true,
          matchedPartId: part.id,
          matchedPartNumber: part.part_number,
          matchConfidence: 0.95,
          matchReason: `Supplier SKU Match (${part.sku || part.part_number})`,
          matchStrategy: 'supplier_sku',
        };
      }
    }
  }

  // 5. Exact Normalised Product Identifier Match (MPN matches normalised Part Number)
  if (normRawMpn) {
    for (const part of existingParts) {
      const normPartNumber = normalizePartNumber(part.part_number);
      if (normRawMpn === normPartNumber) {
        return {
          isDuplicate: true,
          matchedPartId: part.id,
          matchedPartNumber: part.part_number,
          matchConfidence: 0.92,
          matchReason: `Normalised Product Identifier Match (${part.part_number})`,
          matchStrategy: 'normalized_id',
        };
      }
    }
  }

  // 6. Carefully Controlled Secondary Matching (Title Similarity)
  // CRITICAL PRINCIPLE: Never merge products solely because their names appear similar.
  // We mark as isPotentialMatch: true, but isDuplicate: false, surfacing to an Admin for review.
  const normRawTitle = normalizeTitle(rawItem.rawTitle);
  if (rawManufacturer && normRawTitle.length > 5) {
    for (const part of existingParts) {
      const partManuf = (part.manufacturer || part.brand || '').toLowerCase().trim();
      if (partManuf && (partManuf.includes(rawManufacturer) || rawManufacturer.includes(partManuf))) {
        const normPartTitle = normalizeTitle(part.name);
        
        if (normRawTitle === normPartTitle) {
          return {
            isDuplicate: false, // Never auto-merge on title alone
            isPotentialMatch: true,
            matchedPartId: part.id,
            matchedPartNumber: part.part_number,
            matchConfidence: 0.85,
            matchReason: `Exact Title Overlap under ${part.brand || part.manufacturer} (Admin Review Required)`,
            matchStrategy: 'title_similarity_review',
          };
        }

        const rawTokens = new Set(normRawTitle.split(' ').filter(t => t.length >= 2));
        const partTokens = new Set(normPartTitle.split(' ').filter(t => t.length >= 2));
        let common = 0;
        rawTokens.forEach(t => {
          if (partTokens.has(t)) common++;
        });

        const overlapScore = (rawTokens.size + partTokens.size) > 0 
          ? (2 * common) / (rawTokens.size + partTokens.size) 
          : 0;

        if (overlapScore >= 0.65) {
          return {
            isDuplicate: false, // Never auto-merge on title alone
            isPotentialMatch: true,
            matchedPartId: part.id,
            matchedPartNumber: part.part_number,
            matchConfidence: Number(overlapScore.toFixed(2)),
            matchReason: `High Title Similarity (${Math.round(overlapScore * 100)}%) under ${part.brand || part.manufacturer} (Admin Review Required)`,
            matchStrategy: 'title_similarity_review',
          };
        }
      }
    }
  }

  // 7. Unique Product — No Duplicates Found
  return {
    isDuplicate: false,
    isPotentialMatch: false,
    matchedPartId: null,
    matchConfidence: 0.0,
    matchReason: 'Unique product — no catalogue duplicates detected',
    matchStrategy: 'none',
  };
}
