import { 
  Supplier, 
  RawSupplierProduct, 
  NormalisedProduct, 
  SupplierIntegrationMethod, 
  SupplierAuthMethod 
} from '@/lib/types/parts';

export interface AuthResult {
  authenticated: boolean;
  token?: string;
  error?: string;
  expiresAt?: string;
}

export interface ConnectionTestResult {
  success: boolean;
  message: string;
  statusCode?: number;
  latencyMs?: number;
  sampleItemCount?: number;
  errorDetails?: string;
  missingRequirements?: string[];
}

export interface FetchOptions {
  limit?: number;
  offset?: number;
  categoryFilter?: string;
  updatedSince?: string;
  rawPayload?: string; // For pasted CSV/XML/JSON
}

export interface RawStockRecord {
  supplier_sku: string;
  stock_quantity: number;
  in_stock: boolean;
  lead_time_days?: number;
  last_updated?: string;
}

export interface RawPriceRecord {
  supplier_sku: string;
  cost_price: number;
  currency?: string;
  min_order_qty?: number;
}

/**
 * Standard interface that ALL supplier connectors must implement.
 * Never calls external APIs unless real credentials and endpoint are configured.
 */
export interface SupplierConnector {
  readonly supplier: Supplier;
  readonly integrationMethod: SupplierIntegrationMethod;

  /** Check if connector has all required credentials in server environment */
  isConfigured(): boolean;

  /** Get list of missing env vars / configurations needed to activate */
  getMissingRequirements(): string[];

  /** Test endpoint and auth reachability */
  testConnection(): Promise<ConnectionTestResult>;

  /** Fetch product catalogue records from supplier source */
  fetchProducts(options?: FetchOptions): Promise<RawSupplierProduct[]>;

  /** Fetch live inventory / stock quantities */
  fetchInventory(): Promise<RawStockRecord[]>;

  /** Fetch wholesale cost price updates */
  fetchPrices(): Promise<RawPriceRecord[]>;

  /** Normalise raw supplier payload into standardised staging structure */
  normalise(raw: RawSupplierProduct): NormalisedProduct;
}
