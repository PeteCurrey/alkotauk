import { BaseSupplierConnector } from '../base-connector';
import { Supplier, RawSupplierProduct } from '@/lib/types/parts';
import { ConnectionTestResult, FetchOptions, RawStockRecord, RawPriceRecord } from '../types';

export class PdfIngestionConnector extends BaseSupplierConnector {
  constructor(supplier: Supplier) {
    super(supplier, 'pdf');
  }

  public getMissingRequirements(): string[] {
    return [];
  }

  protected async executeConnectionTest(): Promise<ConnectionTestResult> {
    return {
      success: true,
      message: 'PDF & Document text ingestion ready for parsing.',
    };
  }

  public async fetchProducts(options?: FetchOptions): Promise<RawSupplierProduct[]> {
    // When text extracted from PDF or manual paste is provided
    const extractedText = options?.rawPayload;
    if (!extractedText || !extractedText.trim()) return [];

    // Parse plain lines looking for part codes and prices (e.g. "TS2021 Pump ... £450.00")
    const lines = extractedText.split('\n');
    const items: RawSupplierProduct[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Check if line contains a price e.g. £123.45 or $123.45
      const priceMatch = line.match(/(?:£|\$|EUR\s?|GBP\s?)([0-9,]+(?:\.[0-9]{2})?)/i);
      const skuMatch = line.match(/\b([A-Z0-9]{2,5}[-_][A-Z0-9-_]{2,12})\b/i);

      if (priceMatch || skuMatch) {
        const sku = skuMatch ? skuMatch[1] : `DOC-ITEM-${i}`;
        const cost = priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : 0;

        items.push({
          supplier_sku: sku,
          title: line.replace(priceMatch ? priceMatch[0] : '', '').trim() || `Part ${sku}`,
          cost_price: cost,
          brand: this.supplier.name,
          in_stock: true,
          lead_time_days: 3,
          raw_payload: { documentLine: line, lineIndex: i },
        });
      }
    }

    return items;
  }

  public async fetchInventory(): Promise<RawStockRecord[]> {
    return [];
  }

  public async fetchPrices(): Promise<RawPriceRecord[]> {
    return [];
  }
}
