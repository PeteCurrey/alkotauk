// ============================================================================
// ALKOTA UK — CHEMICAL SUPPLIER INGESTION CONNECTOR
// Normalized supplier feed abstraction (API, JSON, XML, PIM, CSV fallback)
// ============================================================================

export interface SupplierChemicalRawRecord {
  supplierId: string;
  supplierName: string;
  externalSku: string;
  masterChemicalCode?: string;
  productName: string;
  packSize: string;
  costPrice: number;
  stockLevel: number;
  hazardClass?: string;
  sdsUrl?: string;
  sourceFeedType: 'api' | 'json_feed' | 'xml_feed' | 'pim_export' | 'csv_import';
}

export interface IngestedSupplierProduct {
  matchedMasterCode: string | null;
  suggestedRetailName: string;
  supplierSku: string;
  supplierName: string;
  packSize: string;
  costPrice: number;
  status: 'matched' | 'unmatched_requires_review' | 'imported';
}

export class ChemicalSupplierIngestionEngine {
  /**
   * Process raw feed and map to Alkota Master Formulation Code
   */
  static processSupplierBatch(records: SupplierChemicalRawRecord[]): IngestedSupplierProduct[] {
    return records.map((rec) => {
      // 1. Direct code matching (e.g. TR-407, TS-602)
      let matchedCode: string | null = null;
      if (rec.masterChemicalCode) {
        matchedCode = rec.masterChemicalCode.toUpperCase().trim();
      } else {
        const match = rec.productName.match(/\b(TR-\d+|TS-\d+|DE-\d+|SD-\d+|RA-\d+)\b/i);
        if (match) {
          matchedCode = match[1].toUpperCase();
        }
      }

      return {
        matchedMasterCode: matchedCode,
        suggestedRetailName: rec.productName,
        supplierSku: rec.externalSku,
        supplierName: rec.supplierName,
        packSize: rec.packSize,
        costPrice: rec.costPrice,
        status: matchedCode ? 'matched' : 'unmatched_requires_review',
      };
    });
  }
}
