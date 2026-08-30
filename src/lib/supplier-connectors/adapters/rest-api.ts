import { BaseSupplierConnector } from '../base-connector';
import { Supplier, RawSupplierProduct } from '@/lib/types/parts';
import { ConnectionTestResult, FetchOptions, RawStockRecord, RawPriceRecord } from '../types';

export class RestApiConnector extends BaseSupplierConnector {
  constructor(supplier: Supplier) {
    super(supplier, 'rest_api');
  }

  protected async executeConnectionTest(): Promise<ConnectionTestResult> {
    const endpoint = this.supplier.api_endpoint || this.supplier.feed_url;
    if (!endpoint) {
      return { success: false, message: 'No API endpoint specified' };
    }

    const start = Date.now();
    try {
      const headers: Record<string, string> = {
        'Accept': 'application/json',
        'User-Agent': 'Alkota-Procurement-Sync/1.0',
      };

      const secret = this.getSecureSecret('API_KEY');
      if (secret) {
        if (this.supplier.auth_method === 'bearer') {
          headers['Authorization'] = `Bearer ${secret}`;
        } else if (this.supplier.auth_method === 'api_key') {
          headers['X-API-Key'] = secret;
        }
      }

      // Safe ping / test request
      const response = await fetch(endpoint, {
        method: 'GET',
        headers,
        signal: AbortSignal.timeout(8000),
      });

      const latencyMs = Date.now() - start;

      if (!response.ok) {
        return {
          success: false,
          statusCode: response.status,
          latencyMs,
          message: `API responded with HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const data = await response.json().catch(() => null);
      const itemCount = Array.isArray(data) ? data.length : (Array.isArray(data?.items || data?.products) ? (data.items || data.products).length : 1);

      return {
        success: true,
        statusCode: response.status,
        latencyMs,
        sampleItemCount: itemCount,
        message: `Connected successfully in ${latencyMs}ms. Found ${itemCount} payload entries.`,
      };
    } catch (err: any) {
      return {
        success: false,
        latencyMs: Date.now() - start,
        message: `Connection failed: ${err.message}`,
        errorDetails: err.stack,
      };
    }
  }

  public async fetchProducts(options?: FetchOptions): Promise<RawSupplierProduct[]> {
    if (!this.isConfigured()) {
      throw new Error(`Cannot fetch from ${this.supplier.name}: missing credentials or endpoint.`);
    }

    const endpoint = this.supplier.api_endpoint || this.supplier.feed_url;
    if (!endpoint) throw new Error('API endpoint is not defined');

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'User-Agent': 'Alkota-Procurement-Sync/1.0',
    };

    const secret = this.getSecureSecret('API_KEY');
    if (secret) {
      if (this.supplier.auth_method === 'bearer') headers['Authorization'] = `Bearer ${secret}`;
      else if (this.supplier.auth_method === 'api_key') headers['X-API-Key'] = secret;
    }

    const url = new URL(endpoint);
    if (options?.limit) url.searchParams.set('limit', String(options.limit));
    if (options?.offset) url.searchParams.set('offset', String(options.offset));
    if (options?.updatedSince) url.searchParams.set('since', options.updatedSince);

    const response = await fetch(url.toString(), { headers, signal: AbortSignal.timeout(20000) });
    if (!response.ok) {
      throw new Error(`Supplier API error HTTP ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    const items: any[] = Array.isArray(json) ? json : (json.items || json.products || json.data || []);

    return items.map((item) => ({
      supplier_sku: item.sku || item.item_code || item.id || item.part_number,
      title: item.title || item.name || item.description,
      description: item.description || item.details,
      brand: item.brand || item.manufacturer || this.supplier.name,
      category: item.category || item.group,
      mpn: item.mpn || item.mfg_part_number || item.manufacturer_sku,
      cost_price: parseFloat(item.cost_price || item.price || item.trade_price || '0'),
      stock_quantity: parseInt(item.stock || item.quantity || item.qty || '0', 10),
      in_stock: item.in_stock ?? (parseInt(item.stock || '0', 10) > 0),
      lead_time_days: parseInt(item.lead_time_days || '2', 10),
      weight_kg: item.weight ? parseFloat(item.weight) : undefined,
      dimensions: item.dimensions,
      images: Array.isArray(item.images) ? item.images : (item.image_url ? [item.image_url] : []),
      documents: Array.isArray(item.documents) ? item.documents : (item.spec_sheet ? [item.spec_sheet] : []),
      specifications: item.specifications || item.specs || {},
      raw_payload: item,
    }));
  }

  public async fetchInventory(): Promise<RawStockRecord[]> {
    const products = await this.fetchProducts({ limit: 500 });
    return products.map(p => ({
      supplier_sku: p.supplier_sku,
      stock_quantity: p.stock_quantity || 0,
      in_stock: p.in_stock ?? true,
      lead_time_days: p.lead_time_days,
      last_updated: new Date().toISOString(),
    }));
  }

  public async fetchPrices(): Promise<RawPriceRecord[]> {
    const products = await this.fetchProducts({ limit: 500 });
    return products.map(p => ({
      supplier_sku: p.supplier_sku,
      cost_price: p.cost_price,
      currency: 'GBP',
    }));
  }
}
