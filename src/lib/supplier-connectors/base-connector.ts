import { 
  Supplier, 
  RawSupplierProduct, 
  NormalisedProduct, 
  SupplierIntegrationMethod 
} from '@/lib/types/parts';
import { 
  SupplierConnector, 
  ConnectionTestResult, 
  FetchOptions, 
  RawStockRecord, 
  RawPriceRecord 
} from './types';

/**
 * Base class providing common credential resolution, safe normalisation,
 * and security guards for all supplier connectors.
 */
export abstract class BaseSupplierConnector implements SupplierConnector {
  readonly supplier: Supplier;
  readonly integrationMethod: SupplierIntegrationMethod;

  constructor(supplier: Supplier, integrationMethod: SupplierIntegrationMethod) {
    this.supplier = supplier;
    this.integrationMethod = integrationMethod;
  }

  /**
   * Securely retrieve the supplier secret from server environment.
   * Format: SUPPLIER_<CREDENTIAL_REF>_API_KEY or SUPPLIER_<SLUG>_SECRET
   * NEVER returns keys to the frontend or stores them in the DB.
   */
  protected getSecureSecret(keyType = 'API_KEY'): string | null {
    const ref = (this.supplier.credential_ref || this.supplier.slug)
      .toUpperCase()
      .replace(/[^A-Z0-9_]/g, '_');
    
    // Check primary convention
    const envVarName = `SUPPLIER_${ref}_${keyType}`;
    const secret = process.env[envVarName];
    if (secret) return secret;

    // Check fallback generic
    const genericName = `SUPPLIER_${ref}`;
    return process.env[genericName] || null;
  }

  public isConfigured(): boolean {
    return this.getMissingRequirements().length === 0;
  }

  public getMissingRequirements(): string[] {
    const missing: string[] = [];
    
    if (this.supplier.auth_method !== 'none' && this.supplier.auth_method) {
      const secret = this.getSecureSecret('API_KEY') || this.getSecureSecret('SECRET');
      if (!secret) {
        const ref = (this.supplier.credential_ref || this.supplier.slug).toUpperCase().replace(/[^A-Z0-9_]/g, '_');
        missing.push(`Environment variable SUPPLIER_${ref}_API_KEY is not configured`);
      }
    }

    if (['rest_api', 'graphql', 'xml_feed', 'json_feed'].includes(this.integrationMethod)) {
      if (!this.supplier.api_endpoint && !this.supplier.feed_url) {
        missing.push('API endpoint URL or Feed URL is not configured in supplier settings');
      }
    }

    return missing;
  }

  public async testConnection(): Promise<ConnectionTestResult> {
    const missing = this.getMissingRequirements();
    if (missing.length > 0) {
      return {
        success: false,
        message: 'Connector configuration incomplete',
        missingRequirements: missing,
      };
    }

    return this.executeConnectionTest();
  }

  protected abstract executeConnectionTest(): Promise<ConnectionTestResult>;

  public abstract fetchProducts(options?: FetchOptions): Promise<RawSupplierProduct[]>;
  public abstract fetchInventory(): Promise<RawStockRecord[]>;
  public abstract fetchPrices(): Promise<RawPriceRecord[]>;

  /**
   * Safe normalisation with validation warnings
   */
  public normalise(raw: RawSupplierProduct): NormalisedProduct {
    const warnings: string[] = [];

    // Clean and validate SKU
    const sku = (raw.supplier_sku || '').trim();
    if (!sku) {
      warnings.push('Missing supplier SKU');
    }

    // Clean and validate Title
    const title = (raw.title || '').trim().replace(/\s+/g, ' ');
    if (!title) {
      warnings.push('Missing product title');
    }

    // Clean Cost Price
    const cost = typeof raw.cost_price === 'number' ? Math.max(0, raw.cost_price) : 0;
    if (cost <= 0) {
      warnings.push('Cost price is zero or invalid');
    }

    // Extract MPN fallback
    let mpn = raw.mpn ? raw.mpn.trim() : undefined;
    if (!mpn && sku) {
      // If SKU looks like an MPN (alphanumeric with hyphen), use it
      if (/^[A-Z0-9]+-[A-Z0-9-]+$/i.test(sku)) {
        mpn = sku;
      }
    }

    // Clean images
    const image_urls = (raw.images || [])
      .map(url => url.trim())
      .filter(url => url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/'));

    // Clean documents
    const document_urls = (raw.documents || [])
      .map(url => url.trim())
      .filter(url => url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/'));

    return {
      supplier_sku: sku,
      raw_title: title,
      raw_description: raw.description ? raw.description.trim() : undefined,
      raw_brand: raw.brand ? raw.brand.trim() : undefined,
      raw_category: raw.category ? raw.category.trim() : undefined,
      cost_price: cost,
      stock_quantity: typeof raw.stock_quantity === 'number' ? Math.max(0, raw.stock_quantity) : 0,
      in_stock: raw.in_stock ?? (typeof raw.stock_quantity === 'number' ? raw.stock_quantity > 0 : true),
      lead_time_days: typeof raw.lead_time_days === 'number' ? Math.max(1, raw.lead_time_days) : 2,
      mpn,
      manufacturer: raw.brand || this.supplier.name,
      weight_kg: raw.weight_kg,
      dimensions_cm: raw.dimensions,
      image_urls,
      document_urls,
      specifications: raw.specifications || {},
      validation_warnings: warnings,
      raw_payload: raw.raw_payload || raw,
    };
  }
}
