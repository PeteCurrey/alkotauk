import { BaseSupplierConnector } from '../base-connector';
import { Supplier, RawSupplierProduct } from '@/lib/types/parts';
import { ConnectionTestResult, FetchOptions, RawStockRecord, RawPriceRecord } from '../types';

export class ManualEntryConnector extends BaseSupplierConnector {
  constructor(supplier: Supplier) {
    super(supplier, 'manual');
  }

  public getMissingRequirements(): string[] {
    return [];
  }

  protected async executeConnectionTest(): Promise<ConnectionTestResult> {
    return {
      success: true,
      message: 'Direct trade desk manual entry active.',
    };
  }

  public async fetchProducts(options?: FetchOptions): Promise<RawSupplierProduct[]> {
    if (options?.rawPayload) {
      try {
        const parsed = JSON.parse(options.rawPayload);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [];
      }
    }
    return [];
  }

  public async fetchInventory(): Promise<RawStockRecord[]> {
    return [];
  }

  public async fetchPrices(): Promise<RawPriceRecord[]> {
    return [];
  }
}
