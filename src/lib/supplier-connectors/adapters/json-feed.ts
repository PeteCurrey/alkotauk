import { BaseSupplierConnector } from '../base-connector';
import { Supplier, RawSupplierProduct } from '@/lib/types/parts';
import { ConnectionTestResult, FetchOptions, RawStockRecord, RawPriceRecord } from '../types';

export class JsonFeedConnector extends BaseSupplierConnector {
  constructor(supplier: Supplier) {
    super(supplier, 'json_feed');
  }

  protected async executeConnectionTest(): Promise<ConnectionTestResult> {
    const feedUrl = this.supplier.feed_url || this.supplier.api_endpoint;
    if (!feedUrl) return { success: false, message: 'No JSON feed URL configured.' };

    const start = Date.now();
    try {
      const res = await fetch(feedUrl, { signal: AbortSignal.timeout(8000) });
      const latencyMs = Date.now() - start;
      if (!res.ok) {
        return { success: false, statusCode: res.status, latencyMs, message: `JSON Feed HTTP ${res.status}: ${res.statusText}` };
      }
      const data = await res.json();
      const count = Array.isArray(data) ? data.length : (Array.isArray(data?.items) ? data.items.length : 1);
      return { success: true, statusCode: res.status, latencyMs, sampleItemCount: count, message: `JSON feed valid. Found ${count} items.` };
    } catch (err: any) {
      return { success: false, latencyMs: Date.now() - start, message: `Feed error: ${err.message}` };
    }
  }

  public async fetchProducts(options?: FetchOptions): Promise<RawSupplierProduct[]> {
    if (options?.rawPayload) {
      const parsed = JSON.parse(options.rawPayload);
      const items: any[] = Array.isArray(parsed) ? parsed : (parsed.items || parsed.products || []);
      return items.map(this.mapJsonItem.bind(this));
    }

    const feedUrl = this.supplier.feed_url || this.supplier.api_endpoint;
    if (!feedUrl) throw new Error('No feed URL configured');

    const res = await fetch(feedUrl, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`Failed to fetch JSON feed: HTTP ${res.status}`);

    const json = await res.json();
    const items: any[] = Array.isArray(json) ? json : (json.items || json.products || json.data || []);
    return items.map(this.mapJsonItem.bind(this));
  }

  private mapJsonItem(item: any): RawSupplierProduct {
    return {
      supplier_sku: item.sku || item.item_code || item.id || item.code,
      title: item.title || item.name || item.description,
      description: item.description || item.details,
      brand: item.brand || item.manufacturer || this.supplier.name,
      category: item.category || item.group,
      mpn: item.mpn || item.mfg_sku,
      cost_price: parseFloat(item.cost_price || item.price || item.trade_price || '0'),
      stock_quantity: parseInt(item.stock_quantity || item.stock || '0', 10),
      in_stock: item.in_stock ?? (parseInt(item.stock || '0', 10) > 0),
      lead_time_days: parseInt(item.lead_time_days || '2', 10),
      weight_kg: item.weight ? parseFloat(item.weight) : undefined,
      images: Array.isArray(item.images) ? item.images : (item.image_url ? [item.image_url] : []),
      documents: Array.isArray(item.documents) ? item.documents : (item.document_url ? [item.document_url] : []),
      specifications: item.specifications || item.specs || {},
      raw_payload: item,
    };
  }

  public async fetchInventory(): Promise<RawStockRecord[]> {
    return [];
  }

  public async fetchPrices(): Promise<RawPriceRecord[]> {
    return [];
  }
}
