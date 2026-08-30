import { BaseSupplierConnector } from '../base-connector';
import { Supplier, RawSupplierProduct } from '@/lib/types/parts';
import { ConnectionTestResult, FetchOptions, RawStockRecord, RawPriceRecord } from '../types';

export class CsvImportConnector extends BaseSupplierConnector {
  constructor(supplier: Supplier) {
    super(supplier, 'csv');
  }

  public getMissingRequirements(): string[] {
    // CSV does not require API keys or remote endpoints to be valid
    return [];
  }

  protected async executeConnectionTest(): Promise<ConnectionTestResult> {
    return {
      success: true,
      message: 'CSV parser ready for batch payload processing.',
    };
  }

  public async fetchProducts(options?: FetchOptions): Promise<RawSupplierProduct[]> {
    const rawCsv = options?.rawPayload;
    if (!rawCsv || !rawCsv.trim()) {
      return [];
    }

    return this.parseCsvString(rawCsv);
  }

  public parseCsvString(csvContent: string): RawSupplierProduct[] {
    const lines = csvContent.trim().split(/\r?\n/);
    if (lines.length <= 1) return [];

    // Parse header row
    const headers = this.parseCsvRow(lines[0]).map(h => h.toLowerCase().trim().replace(/[^a-z0-9_]/g, '_'));

    const skuIdx = this.findHeaderIndex(headers, ['supplier_sku', 'sku', 'part_number', 'item_code', 'code', 'id']);
    const titleIdx = this.findHeaderIndex(headers, ['title', 'product_name', 'name', 'description', 'desc']);
    const brandIdx = this.findHeaderIndex(headers, ['brand', 'manufacturer', 'mfg', 'make']);
    const categoryIdx = this.findHeaderIndex(headers, ['category', 'group', 'dept', 'type']);
    const mpnIdx = this.findHeaderIndex(headers, ['mpn', 'mfg_part_number', 'oem_number', 'mfg_sku']);
    const costIdx = this.findHeaderIndex(headers, ['cost_price', 'cost', 'trade_price', 'price', 'wholesale_price']);
    const stockIdx = this.findHeaderIndex(headers, ['stock_quantity', 'stock_qty', 'stock', 'qty', 'quantity']);
    const descIdx = this.findHeaderIndex(headers, ['long_description', 'description', 'details', 'notes']);

    const results: RawSupplierProduct[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const cells = this.parseCsvRow(line);
      const sku = skuIdx >= 0 && cells[skuIdx] ? cells[skuIdx].trim() : `ITEM-${i}`;
      const title = titleIdx >= 0 && cells[titleIdx] ? cells[titleIdx].trim() : `Part ${sku}`;
      const cost = costIdx >= 0 && cells[costIdx] ? parseFloat(cells[costIdx].replace(/[^0-9.]/g, '')) || 0 : 0;
      const stock = stockIdx >= 0 && cells[stockIdx] ? parseInt(cells[stockIdx].replace(/[^0-9]/g, ''), 10) || 0 : 0;

      results.push({
        supplier_sku: sku,
        title,
        description: descIdx >= 0 && cells[descIdx] ? cells[descIdx].trim() : undefined,
        brand: brandIdx >= 0 && cells[brandIdx] ? cells[brandIdx].trim() : this.supplier.name,
        category: categoryIdx >= 0 && cells[categoryIdx] ? cells[categoryIdx].trim() : undefined,
        mpn: mpnIdx >= 0 && cells[mpnIdx] ? cells[mpnIdx].trim() : undefined,
        cost_price: cost,
        stock_quantity: stock,
        in_stock: stock > 0,
        lead_time_days: 2,
        raw_payload: { rawRowIndex: i, cells, headers },
      });
    }

    return results;
  }

  private findHeaderIndex(headers: string[], candidates: string[]): number {
    for (const cand of candidates) {
      const idx = headers.indexOf(cand);
      if (idx >= 0) return idx;
    }
    // Partial substring search
    for (const cand of candidates) {
      const idx = headers.findIndex(h => h.includes(cand));
      if (idx >= 0) return idx;
    }
    return -1;
  }

  private parseCsvRow(row: string): string[] {
    const result: string[] = [];
    let insideQuotes = false;
    let currentField = '';

    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        if (insideQuotes && row[i + 1] === '"') {
          currentField += '"';
          i++; // skip escaped quote
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        result.push(currentField);
        currentField = '';
      } else {
        currentField += char;
      }
    }
    result.push(currentField);
    return result;
  }

  public async fetchInventory(): Promise<RawStockRecord[]> {
    return [];
  }

  public async fetchPrices(): Promise<RawPriceRecord[]> {
    return [];
  }
}
