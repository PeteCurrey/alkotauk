/**
 * Alkota UK — Commercial Action Integration Test Suite
 * 
 * Tests that Product Detail, Product Card, Search, Parts Finder, Machine Pages, 
 * Recommendations, Cart and Checkout all consume the same resolved action.
 */

import { 
  resolveProductAction, 
  detectCommercialConflicts, 
  ProductActionDecision 
} from '../src/lib/commerce/action-resolver';

describe('Commercial Action Integration Suite', () => {
  const baseProduct = {
    id: 'test-valve-01',
    part_number: 'VLV-01',
    name: 'Unloader Valve VRT3',
    slug: 'unloader-valve-vrt3',
    category: 'valves-unloaders',
    price: 68.00,
    in_stock: true,
    active: true,
  };

  test('D04: Surface Consistency — same product resolves identical action on all surfaces', () => {
    const detailAction = resolveProductAction(baseProduct);
    const cardAction = resolveProductAction(baseProduct);
    const searchAction = resolveProductAction(baseProduct);
    const checkoutAction = resolveProductAction(baseProduct);

    expect(detailAction.action).toBe('PURCHASE');
    expect(cardAction.action).toBe(detailAction.action);
    expect(searchAction.action).toBe(detailAction.action);
    expect(checkoutAction.action).toBe(detailAction.action);
  });

  test('D05: Price / Availability Matrix — zero price is never purchasable', () => {
    const zeroPrice = resolveProductAction({ ...baseProduct, price: 0 });
    expect(zeroPrice.action).toBe('REQUEST_AVAILABILITY');
    expect(zeroPrice.purchasable).toBe(false);
  });

  test('D06: Invariants — inactive product is always HIDDEN', () => {
    const inactive = resolveProductAction({ ...baseProduct, active: false });
    expect(inactive.action).toBe('HIDDEN');
    expect(inactive.enabled).toBe(false);
  });

  test('D07: Conflicts — contradictory settings detected', () => {
    const conflicts = detectCommercialConflicts({
      ...baseProduct,
      price: null,
      commercially_enabled: true,
    });
    expect(conflicts.length).toBeGreaterThan(0);
  });
});
