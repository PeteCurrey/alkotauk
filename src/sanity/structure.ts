import type { StructureResolver } from 'sanity/structure';
import { Cog, Users } from 'lucide-react';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Alkota UK Console')
    .items([
      // Platform Controls (Singleton)
      S.listItem()
        .title('Platform Controls')
        .id('siteSettings')
        .icon(Cog)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      
      S.divider(),

      // Leads (Collection)
      S.listItem()
        .title('Lead Management')
        .schemaType('lead')
        .icon(Users)
        .child(
          S.documentTypeList('lead')
            .title('Incoming Leads')
        ),

      S.divider(),

      // Standard Document Types
      ...S.documentTypeListItems().filter(
        (item) => !['siteSettings', 'lead'].includes(item.getId()!)
      ),
    ]);
