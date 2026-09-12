import { supabaseAdmin } from '../supabase/server';
import { Part, PartAuditLog } from '../types/parts';

export interface DataQualityBreakdown {
  totalScore: number; // 0 - 100
  identity: number; // 0 - 15
  category: number; // 0 - 15
  description: number; // 0 - 15
  technicalData: number; // 0 - 15
  image: number; // 0 - 15
  price: number; // 0 - 10
  stock: number; // 0 - 5
  documents: number; // 0 - 5
  seo: number; // 0 - 5
  missingElements: string[];
}

/**
 * Calculates a transparent data quality score (0 - 100) based on commercial & technical completeness.
 */
export function calculateDataQuality(part: Partial<Part>): DataQualityBreakdown {
  const missingElements: string[] = [];

  // 1. Identity (15 pts): Part number + Name + (MPN or Brand)
  let identity = 0;
  if (part.part_number) identity += 5;
  else missingElements.push('Missing Part Number');

  if (part.name && part.name.length >= 8) identity += 5;
  else missingElements.push('Incomplete Product Title');

  if (part.mpn || part.brand || part.manufacturer) identity += 5;
  else missingElements.push('Missing MPN / Brand');

  // 2. Category (15 pts): Category + Subcategory
  let category = 0;
  if (part.category && part.category !== 'other') category += 10;
  else missingElements.push('Category unassigned / Other');

  if (part.subcategory) category += 5;

  // 3. Description (15 pts): Meaningful editorial text
  let description = 0;
  if (part.description && part.description.length >= 30) description += 15;
  else if (part.description && part.description.length > 0) description += 8;
  else missingElements.push('Missing Description');

  // 4. Technical Data (15 pts): Weight, Dimensions, Specs or Technical Notes
  let technicalData = 0;
  if (part.weight_kg && part.weight_kg > 0) technicalData += 4;
  if (part.dimensions_cm) technicalData += 3;
  if (part.technical_notes && part.technical_notes.length > 5) technicalData += 4;
  if (part.specifications && Object.keys(part.specifications).length > 0) technicalData += 4;
  if (technicalData < 6) missingElements.push('Sparse Technical Data');

  // 5. Image (15 pts): Primary image URL
  let image = 0;
  if (part.image_url && part.image_url.startsWith('http')) image += 15;
  else missingElements.push('Missing Product Image');

  // 6. Price (10 pts): Authorized selling price (> 0)
  let price = 0;
  if (part.price && Number(part.price) > 0) price += 10;
  else missingElements.push('Unpriced / POA');

  // 7. Stock (5 pts): In-stock status explicitly declared
  let stock = 0;
  if (part.availability_status && part.availability_status !== 'check_availability') stock += 5;
  else if (part.in_stock !== undefined) stock += 3;

  // 8. Documents (5 pts): Spec sheet, manual, or schematic attached
  let documents = 0;
  if (part.documents && part.documents.length > 0) documents += 5;

  // 9. SEO (5 pts): Meta title and description
  let seo = 0;
  if (part.meta_title && part.meta_description) seo += 5;
  else if (part.meta_title || part.meta_description) seo += 2;

  const totalScore = Math.min(100, identity + category + description + technicalData + image + price + stock + documents + seo);

  return {
    totalScore,
    identity,
    category,
    description,
    technicalData,
    image,
    price,
    stock,
    documents,
    seo,
    missingElements,
  };
}

/**
 * Records an entry into the part_audit_log table.
 * Gracefully handles cases where the table has not yet been migrated.
 */
export async function recordPartAuditLog(log: {
  part_id?: string | null;
  part_number: string;
  action: string;
  changed_field: string;
  old_value?: string | null;
  new_value?: string | null;
  changed_by?: string;
  source?: string | null;
  notes?: string | null;
}): Promise<boolean> {
  try {
    const payload = {
      part_id: log.part_id || null,
      part_number: log.part_number,
      action: log.action,
      changed_field: log.changed_field,
      old_value: log.old_value || null,
      new_value: log.new_value || null,
      changed_by: log.changed_by || 'system',
      source: log.source || null,
      notes: log.notes || null,
    };

    const { error } = await supabaseAdmin.from('part_audit_log').insert(payload);
    if (error) {
      console.warn('[provenance] Could not insert audit log (table may need migration):', error.message);
      return false;
    }
    return true;
  } catch (err: any) {
    console.warn('[provenance] Exception recording audit log:', err.message);
    return false;
  }
}

/**
 * Checks if a specific product field is protected by manual administrator overrides.
 */
export function isFieldOverridden(part: Partial<Part>, fieldName: string): boolean {
  if (!part.manual_override_fields || !Array.isArray(part.manual_override_fields)) {
    return false;
  }
  return part.manual_override_fields.includes(fieldName);
}
