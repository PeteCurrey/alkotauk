import { BaseSupplierConnector } from '../base-connector';
import { Supplier, RawSupplierProduct } from '@/lib/types/parts';
import { ConnectionTestResult, FetchOptions, RawStockRecord, RawPriceRecord } from '../types';

export class XmlFeedConnector extends BaseSupplierConnector {
  constructor(supplier: Supplier) {
    super(supplier, 'xml_feed');
  }

  protected async executeConnectionTest(): Promise<ConnectionTestResult> {
    const feedUrl = this.supplier.feed_url;
    if (!feedUrl) return { success: false, message: 'No XML feed URL configured.' };

    const start = Date.now();
    try {
      const res = await fetch(feedUrl, { signal: AbortSignal.timeout(8000) });
      const latencyMs = Date.now() - start;
      if (!res.ok) return { success: false, statusCode: res.status, latencyMs, message: `XML Feed HTTP ${res.status}: ${res.statusText}` };
      const text = await res.text();
      const count = (text.match(/<item[\s>]/gi) || text.match(/<product[\s>]/gi) || []).length;
      return { success: true, statusCode: res.status, latencyMs, sampleItemCount: count, message: `XML feed reachable. Found ~${count} product tags.` };
    } catch (err: any) {
      return { success: false, latencyMs: Date.now() - start, message: `XML fetch error: ${err.message}` };
    }
  }

  public async fetchProducts(options?: FetchOptions): Promise<RawSupplierProduct[]> {
    let xmlText = options?.rawPayload;
    if (!xmlText) {
      const feedUrl = this.supplier.feed_url;
      if (!feedUrl) throw new Error('No XML feed URL configured');
      const res = await fetch(feedUrl, { signal: AbortSignal.timeout(20000) });
      if (!res.ok) throw new Error(`XML Feed error HTTP ${res.status}`);
      xmlText = await res.text();
    }

    // Basic regex-based XML item extractor (safe for lightweight serverless)
    const itemMatches = xmlText.match(/<(?:item|product)[^>]*>([\s\S]*?)<\/(?:item|product)>/gi) || [];
    
    return itemMatches.map((itemXml) => {
      const getTag = (tag: string): string | undefined => {
        const match = itemXml.match(new RegExp(`<${tag}[^>]*>(.*?)<\\/${tag}>`, 'i'));
        return match ? match[1].replace(/<!\[CDATA\[(.*?)\]\]>/gi, '$1').trim() : undefined;
      };

      const sku = getTag('sku') || getTag('g:id') || getTag('id') || getTag('part_number') || 'UNKNOWN';
      const title = getTag('title') || getTag('g:title') || getTag('name') || 'Unnamed Item';
      const desc = getTag('description') || getTag('g:description');
      const priceStr = getTag('price') || getTag('g:price') || getTag('cost') || '0';
      const cost = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
      const brand = getTag('brand') || getTag('g:brand') || this.supplier.name;
      const category = getTag('category') || getTag('g:product_type');
      const mpn = getTag('mpn') || getTag('g:mpn');
      const img = getTag('image_link') || getTag('g:image_link') || getTag('image');

      return {
        supplier_sku: sku,
        title,
        description: desc,
        brand,
        category,
        mpn,
        cost_price: cost,
        in_stock: true,
        images: img ? [img] : [],
        raw_payload: { itemXml },
      };
    });
  }

  public async fetchInventory(): Promise<RawStockRecord[]> {
    return [];
  }

  public async fetchPrices(): Promise<RawPriceRecord[]> {
    return [];
  }
}
