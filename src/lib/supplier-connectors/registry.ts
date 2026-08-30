import { SupplierIntegrationMethod } from '@/lib/types/parts';

export interface SupplierIntegrationMetadata {
  slug: string;
  name: string;
  defaultMethod: SupplierIntegrationMethod;
  supportedMethods: SupplierIntegrationMethod[];
  website: string;
  credentialEnvPattern: string;
  description: string;
}

/**
 * Registry of known major suppliers and manufacturers.
 * Connectors remain inactive until real credentials and endpoints are supplied.
 */
export const SUPPLIER_REGISTRY: Record<string, SupplierIntegrationMetadata> = {
  'dual-pumps': {
    slug: 'dual-pumps',
    name: 'Dual Pumps Ltd',
    defaultMethod: 'csv',
    supportedMethods: ['rest_api', 'xml_feed', 'csv', 'manual'],
    website: 'https://dualpumps.co.uk',
    credentialEnvPattern: 'SUPPLIER_DUAL_PUMPS_API_KEY',
    description: 'UK industrial pump and accessories distributor. Supports CSV trade catalogue feeds and API ordering.',
  },
  'flowjet': {
    slug: 'flowjet',
    name: 'Flowjet Cleaning Equipment Ltd',
    defaultMethod: 'csv',
    supportedMethods: ['xml_feed', 'csv', 'manual'],
    website: 'https://flowjet.co.uk',
    credentialEnvPattern: 'SUPPLIER_FLOWJET_API_KEY',
    description: 'UK high pressure cleaning components and spares wholesaler.',
  },
  'exchange-engineering': {
    slug: 'exchange-engineering',
    name: 'Exchange Engineering Ltd',
    defaultMethod: 'csv',
    supportedMethods: ['csv', 'manual', 'pdf'],
    website: 'https://exchangeengineering.co.uk',
    credentialEnvPattern: 'SUPPLIER_EXCHANGE_ENGINEERING_API_KEY',
    description: 'Specialist pressure washer components, fittings, hoses, and trigger guns.',
  },
  'gs-penrith': {
    slug: 'gs-penrith',
    name: 'G&S Penrith',
    defaultMethod: 'manual',
    supportedMethods: ['csv', 'manual', 'pdf'],
    website: 'https://gandspenrith.co.uk',
    credentialEnvPattern: 'SUPPLIER_GS_PENRITH_API_KEY',
    description: 'UK pressure washer components, engine spare parts, and agricultural washdown gear.',
  },
  'stinson': {
    slug: 'stinson',
    name: 'Stinson Equipment UK',
    defaultMethod: 'manual',
    supportedMethods: ['csv', 'manual'],
    website: 'https://stinson.co.uk',
    credentialEnvPattern: 'SUPPLIER_STINSON_API_KEY',
    description: 'OEM burner parts, Wayne and Beckett combustion assemblies, fuel pumps, and transformers.',
  },
  'giant-pumps': {
    slug: 'giant-pumps',
    name: 'Giant Industries Inc',
    defaultMethod: 'manual',
    supportedMethods: ['pdf', 'manual', 'csv'],
    website: 'https://giantpumps.com',
    credentialEnvPattern: 'SUPPLIER_GIANT_API_KEY',
    description: 'OEM industrial triplex plunger pumps and packing seal kits.',
  },
  'mosmatic': {
    slug: 'mosmatic',
    name: 'Mosmatic AG',
    defaultMethod: 'manual',
    supportedMethods: ['pdf', 'csv', 'manual'],
    website: 'https://mosmatic.com',
    credentialEnvPattern: 'SUPPLIER_MOSMATIC_API_KEY',
    description: 'Swiss rotary unions, ceiling booms, surface cleaners, and undercarriage tools.',
  },
  'coxreels': {
    slug: 'coxreels',
    name: 'CoxREELS / CRI Reels',
    defaultMethod: 'manual',
    supportedMethods: ['pdf', 'csv', 'manual'],
    website: 'https://coxreels.com',
    credentialEnvPattern: 'SUPPLIER_COXREELS_API_KEY',
    description: 'Heavy-duty industrial hose and cord reels.',
  },
  'interpump': {
    slug: 'interpump',
    name: 'Interpump Group',
    defaultMethod: 'manual',
    supportedMethods: ['csv', 'manual', 'pdf'],
    website: 'https://interpumpgroup.it',
    credentialEnvPattern: 'SUPPLIER_INTERPUMP_API_KEY',
    description: 'Italian high pressure water plunger pumps and spares.',
  },
  'cat-pumps': {
    slug: 'cat-pumps',
    name: 'Cat Pumps UK',
    defaultMethod: 'manual',
    supportedMethods: ['csv', 'manual', 'pdf'],
    website: 'https://catpumps.co.uk',
    credentialEnvPattern: 'SUPPLIER_CAT_PUMPS_API_KEY',
    description: 'High-pressure triplex plunger and piston pumps.',
  },
};
