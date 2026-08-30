import { Supplier, SupplierIntegrationMethod } from '@/lib/types/parts';
import { SupplierConnector } from './types';
import { RestApiConnector } from './adapters/rest-api';
import { CsvImportConnector } from './adapters/csv-import';
import { JsonFeedConnector } from './adapters/json-feed';
import { XmlFeedConnector } from './adapters/xml-feed';
import { PdfIngestionConnector } from './adapters/pdf-ingestion';
import { ManualEntryConnector } from './adapters/manual-entry';

/**
 * Factory function to instantiate the correct SupplierConnector
 * based on the supplier's configured integration method.
 */
export function createSupplierConnector(supplier: Supplier): SupplierConnector {
  const method: SupplierIntegrationMethod = supplier.integration_method || (supplier.feed_type === 'api' ? 'rest_api' : (supplier.feed_type === 'xml' ? 'xml_feed' : (supplier.feed_type === 'csv' ? 'csv' : 'manual')));

  switch (method) {
    case 'rest_api':
    case 'graphql':
      return new RestApiConnector(supplier);
    case 'csv':
    case 'xlsx':
      return new CsvImportConnector(supplier);
    case 'json_feed':
    case 'pim':
      return new JsonFeedConnector(supplier);
    case 'xml_feed':
    case 'ftp':
    case 'sftp':
      return new XmlFeedConnector(supplier);
    case 'pdf':
      return new PdfIngestionConnector(supplier);
    case 'manual':
    default:
      return new ManualEntryConnector(supplier);
  }
}
