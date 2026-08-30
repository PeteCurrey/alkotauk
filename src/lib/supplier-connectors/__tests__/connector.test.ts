import { CsvImportConnector } from '../adapters/csv-import';
import { RestApiConnector } from '../adapters/rest-api';
import { Supplier } from '@/lib/types/parts';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

export function runConnectorTests() {
  const dummySupplier: Supplier = {
    id: 'supp-1',
    slug: 'dual-pumps',
    name: 'Dual Pumps Ltd',
    supplier_type: 'wholesaler',
    default_margin_pct: 35.0,
    feed_type: 'csv',
    active: true,
  };

  // Test 1: Normalisation
  const connector = new CsvImportConnector(dummySupplier);
  const raw = {
    supplier_sku: 'DP-PMP-101',
    title: '  Triplex Plunger Pump 200 Bar  ',
    description: 'High pressure commercial pump',
    brand: 'Interpump',
    category: 'pumps',
    cost_price: 320.00,
    stock_quantity: 15,
    images: ['https://example.com/pump.jpg', 'invalid-url'],
  };

  const normalised = connector.normalise(raw);
  assert(normalised.supplier_sku === 'DP-PMP-101', 'SKU matches');
  assert(normalised.raw_title === 'Triplex Plunger Pump 200 Bar', 'Title trimmed');
  assert(normalised.cost_price === 320.00, 'Cost price is 320');
  assert(normalised.stock_quantity === 15, 'Stock quantity is 15');
  assert(normalised.in_stock === true, 'In stock is true');
  assert(normalised.image_urls.length === 1, 'Invalid image stripped');

  // Test 2: Unconfigured missing requirements
  const unconfiguredSupplier: Supplier = {
    ...dummySupplier,
    feed_type: 'api',
    integration_method: 'rest_api',
    auth_method: 'api_key',
    api_endpoint: null,
  };

  const restConnector = new RestApiConnector(unconfiguredSupplier);
  assert(restConnector.isConfigured() === false, 'Unconfigured returns false');
  assert(restConnector.getMissingRequirements().length > 0, 'Missing requirements reported');

  return { success: true, message: 'All connector tests passed' };
}
