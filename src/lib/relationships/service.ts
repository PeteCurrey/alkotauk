import { supabaseAdmin } from '@/lib/supabase/server';
import { 
  ProductRelationship, 
  ResolvedRelationship, 
  MachineEcosystem, 
  RelationshipDomain, 
  RelationshipType 
} from './types';
import { CANONICAL_RELATIONSHIPS } from './canonical-data';
import { PARTS_CATALOGUE_V2 } from '@/lib/parts/catalogue-seed-v2';
import { VERIFIED_ATTACHMENTS } from '@/lib/attachments/seed-data';
import { getProducts, getProductBySlug } from '@/lib/products';
import { resolveMachineImage } from '@/lib/images';

/**
 * Standardises model codes and slugs for robust cross-matching.
 */
function normaliseCode(str?: string | null): string {
  if (!str) return '';
  return str.toLowerCase().trim().replace(/^alkota-?/, '').replace(/[^a-z0-9]/g, '');
}

/**
 * Fetch raw relationships from Supabase with fallback to canonical dataset.
 */
export async function getRawRelationships(filter?: {
  source_id?: string;
  target_id?: string;
  relationship_domain?: RelationshipDomain;
  relationship_type?: RelationshipType;
  status?: string;
  activeOnly?: boolean;
}): Promise<ProductRelationship[]> {
  try {
    let query = supabaseAdmin
      .from('product_relationships')
      .select('*');

    if (filter?.source_id) {
      query = query.eq('source_id', filter.source_id);
    }
    if (filter?.target_id) {
      query = query.eq('target_id', filter.target_id);
    }
    if (filter?.relationship_domain) {
      query = query.eq('relationship_domain', filter.relationship_domain);
    }
    if (filter?.relationship_type) {
      query = query.eq('relationship_type', filter.relationship_type);
    }
    if (filter?.status) {
      query = query.eq('status', filter.status);
    }
    if (filter?.activeOnly !== false) {
      query = query.eq('active', true);
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as ProductRelationship[];
    }
  } catch (err) {
    // Database fallback
  }

  // In-memory canonical fallback
  let list = [...CANONICAL_RELATIONSHIPS];

  if (filter?.source_id) {
    const sNorm = normaliseCode(filter.source_id);
    list = list.filter(r => normaliseCode(r.source_id) === sNorm || r.source_id === filter.source_id);
  }
  if (filter?.target_id) {
    const tNorm = normaliseCode(filter.target_id);
    list = list.filter(r => normaliseCode(r.target_id) === tNorm || r.target_id === filter.target_id);
  }
  if (filter?.relationship_domain) {
    list = list.filter(r => r.relationship_domain === filter.relationship_domain);
  }
  if (filter?.relationship_type) {
    list = list.filter(r => r.relationship_type === filter.relationship_type);
  }
  if (filter?.status) {
    list = list.filter(r => r.status === filter.status);
  }
  if (filter?.activeOnly !== false) {
    list = list.filter(r => r.active);
  }

  return list;
}

/**
 * Resolves target entities (products, parts, attachments, chemicals) into uniform display cards.
 */
async function resolveTarget(rel: ProductRelationship): Promise<ResolvedRelationship | null> {
  const tId = rel.target_id;

  // 1. Target is a PART
  if (rel.target_type === 'part') {
    const part = PARTS_CATALOGUE_V2.find(
      p => p.slug === tId || p.part_number.toLowerCase() === tId.toLowerCase()
    );
    if (part) {
      return {
        relationship: rel,
        target: {
          title: part.name,
          slug: part.slug,
          type: 'part',
          category: part.category,
          image_url: part.image_url || null,
          price: part.price || null,
          code_or_number: part.part_number,
          tagline_or_desc: part.description || '',
          badge: part.oem_genuine ? 'OEM Genuine' : undefined,
          spec_summary: part.technical_notes || undefined,
          href: `/parts-attachments/product/${part.slug}`
        }
      };
    }

    // Generic fallback for parts listed in relationships
    return {
      relationship: rel,
      target: {
        title: tId.replace(/-/g, ' ').toUpperCase(),
        slug: tId,
        type: 'part',
        code_or_number: tId.toUpperCase(),
        tagline_or_desc: rel.notes || 'Genuine replacement spare part.',
        href: `/parts-attachments/search?q=${encodeURIComponent(tId)}`
      }
    };
  }

  // 2. Target is an ATTACHMENT
  if (rel.target_type === 'attachment') {
    const att = VERIFIED_ATTACHMENTS.find(a => a.slug === tId || a.id === tId || a.part_number?.toLowerCase() === tId.toLowerCase());
    if (att) {
      const specSummary = att.ratings 
        ? `${att.ratings.pressure_min_bar || 0}–${att.ratings.pressure_max_bar} BAR · ${att.ratings.flow_min_lpm || 0}–${att.ratings.flow_max_lpm} LPM`
        : undefined;

      return {
        relationship: rel,
        target: {
          title: att.name,
          slug: att.slug,
          type: 'attachment',
          category: att.category,
          image_url: att.image_url || null,
          price: att.price || null,
          code_or_number: att.part_number,
          tagline_or_desc: att.tagline || att.description,
          spec_summary: specSummary,
          href: `/parts-attachments/product/${att.slug}`
        }
      };
    }
  }

  // 3. Target is a MACHINE
  if (rel.target_type === 'machine') {
    const machine = await getProductBySlug(tId);
    if (machine) {
      const modelCode = machine.model_code || machine.name;
      const imageUrl = resolveMachineImage(machine.primary_image_url, modelCode, machine.category);
      const bar = machine.pressure_bar ? `${machine.pressure_bar} Bar` : '';
      const lpm = machine.flow_rate_lpm ? `${machine.flow_rate_lpm} L/min` : '';
      const spec = [bar, lpm].filter(Boolean).join(' · ');

      return {
        relationship: rel,
        target: {
          title: machine.name,
          slug: machine.slug,
          type: 'machine',
          category: machine.category,
          image_url: imageUrl,
          code_or_number: modelCode,
          tagline_or_desc: machine.tagline || machine.short_description || undefined,
          badge: machine.is_elite_series ? 'Elite Series' : undefined,
          spec_summary: spec,
          href: `/machines/${machine.category}/${machine.slug}`
        }
      };
    }
  }

  // 4. Target is a CHEMICAL
  if (rel.target_type === 'chemical') {
    return {
      relationship: rel,
      target: {
        title: tId.replace(/-/g, ' ').toUpperCase(),
        slug: tId,
        type: 'chemical',
        category: 'degreaser',
        tagline_or_desc: rel.notes || 'Industrial formulation.',
        badge: rel.relationship_domain === 'COMPATIBILITY' ? 'Approved Formulation' : 'Application Recommended',
        href: `/chemicals`
      }
    };
  }

  return null;
}

/**
 * Strict Compatibility Query: returns ONLY published, verified engineering compatibility relationships.
 * NEVER returns GENERAL relationships.
 */
export async function getCompatibleProducts(sourceId: string): Promise<ResolvedRelationship[]> {
  const rels = await getRawRelationships({
    source_id: sourceId,
    relationship_domain: 'COMPATIBILITY',
    status: 'published',
    activeOnly: true
  });

  // Filter out any unverified or not compatible items
  const verified = rels.filter(r => 
    ['VERIFIED', 'MANUFACTURER_SUPPORTED', 'UK_ENGINEERING_VERIFIED'].includes(r.confidence)
  );

  const resolved = await Promise.all(verified.map(resolveTarget));
  return resolved.filter((r): r is ResolvedRelationship => r !== null);
}

/**
 * Strict General Relationship Query: returns commercial/discovery links (series, alternatives, applications).
 * NEVER claims engineering compatibility.
 */
export async function getRelatedProducts(sourceId: string): Promise<ResolvedRelationship[]> {
  const rels = await getRawRelationships({
    source_id: sourceId,
    relationship_domain: 'GENERAL',
    status: 'published',
    activeOnly: true
  });

  const resolved = await Promise.all(rels.map(resolveTarget));
  return resolved.filter((r): r is ResolvedRelationship => r !== null);
}

/**
 * Assembles the complete Machine Ecosystem, clearly segregating:
 * - Compatible Parts (Engineering)
 * - Compatible Attachments (Engineering)
 * - Verified Machine Care Chemicals (Engineering)
 * - General Series & Alternatives (Merchandising / Discovery)
 * - General Application Detergents (Merchandising / Application)
 */
export async function getMachineEcosystem(machineSlugOrModel: string): Promise<MachineEcosystem> {
  const norm = normaliseCode(machineSlugOrModel);

  // 1. Fetch explicit database/canonical relationships
  const compat = await getCompatibleProducts(machineSlugOrModel);
  const general = await getRelatedProducts(machineSlugOrModel);

  // 2. Cross-reference PARTS_CATALOGUE_V2 for explicit OEM model compatibility
  const extraParts: ResolvedRelationship[] = [];
  for (const part of PARTS_CATALOGUE_V2) {
    if (Array.isArray(part.compatible_machines)) {
      const match = part.compatible_machines.some(m => {
        const mNorm = normaliseCode(m);
        return mNorm === norm || (mNorm.length >= 3 && norm.includes(mNorm));
      });

      if (match && !compat.some(c => c.target.slug === part.slug)) {
        extraParts.push({
          relationship: {
            id: `v2-part-${part.slug}-${norm}`,
            source_id: machineSlugOrModel,
            source_type: 'machine',
            target_id: part.slug,
            target_type: 'part',
            relationship_domain: 'COMPATIBILITY',
            relationship_type: 'MACHINE_PART',
            status: 'published',
            confidence: 'VERIFIED',
            evidence: `OEM Cross-Reference: ${part.name} is specified for Alkota ${part.compatible_machines.join(', ')}`,
            sort_order: 10,
            active: true
          },
          target: {
            title: part.name,
            slug: part.slug,
            type: 'part',
            category: part.category,
            image_url: part.image_url || null,
            price: part.price || null,
            code_or_number: part.part_number,
            tagline_or_desc: part.description || '',
            badge: part.oem_genuine ? 'OEM Genuine' : undefined,
            spec_summary: part.technical_notes || undefined,
            href: `/parts-attachments/product/${part.slug}`
          }
        });
      }
    }
  }

  // 3. Cross-reference VERIFIED_ATTACHMENTS for explicit machine compatibility
  const extraAttachments: ResolvedRelationship[] = [];
  for (const att of VERIFIED_ATTACHMENTS) {
    if (Array.isArray(att.compatible_machines)) {
      const match = att.compatible_machines.some(c => {
        const cNorm = normaliseCode(c.machine_model_code || c.machine_slug);
        return c.status === 'compatible' && (cNorm === norm || (cNorm.length >= 3 && norm.includes(cNorm)));
      });

      if (match && !compat.some(c => c.target.slug === att.slug)) {
        const specSummary = att.ratings 
          ? `${att.ratings.pressure_min_bar || 0}–${att.ratings.pressure_max_bar} BAR · ${att.ratings.flow_min_lpm || 0}–${att.ratings.flow_max_lpm} LPM`
          : undefined;

        extraAttachments.push({
          relationship: {
            id: `v2-att-${att.slug}-${norm}`,
            source_id: machineSlugOrModel,
            source_type: 'machine',
            target_id: att.slug,
            target_type: 'attachment',
            relationship_domain: 'COMPATIBILITY',
            relationship_type: 'MACHINE_ATTACHMENT',
            status: 'published',
            confidence: 'VERIFIED',
            evidence: `Alkota Attachment Compatibility: Verified operating envelope for ${att.compatible_machines.map(m => m.machine_model_code).join(', ')}`,
            sort_order: 15,
            active: true
          },
          target: {
            title: att.name,
            slug: att.slug,
            type: 'attachment',
            category: att.category,
            image_url: att.image_url || null,
            price: att.price || null,
            code_or_number: att.part_number,
            tagline_or_desc: att.tagline || att.description,
            spec_summary: specSummary,
            href: `/parts-attachments/product/${att.slug}`
          }
        });
      }
    }
  }

  // 4. Group results cleanly by domain and sub-category
  const allParts = [...compat.filter(r => r.target.type === 'part'), ...extraParts];
  const allAttachments = [...compat.filter(r => r.target.type === 'attachment'), ...extraAttachments];
  const machineCareChems = compat.filter(r => r.target.type === 'chemical');

  const seriesMachines = general.filter(r => r.relationship.relationship_type === 'SAME_SERIES');
  const alternativeMachines = general.filter(r => 
    ['ALTERNATIVE_PRODUCT', 'UPGRADE_TO', 'SIMILAR_PRODUCT'].includes(r.relationship.relationship_type)
  );
  const applicationChemicals = general.filter(r => 
    ['SAME_APPLICATION', 'RECOMMENDED_ALONGSIDE', 'RELATED_CHEMICAL'].includes(r.relationship.relationship_type)
  );
  const recommendedAccessories = general.filter(r => 
    ['RELATED_ACCESSORY', 'RECOMMENDED_PRODUCT'].includes(r.relationship.relationship_type)
  );

  return {
    compatibleParts: allParts,
    compatibleAttachments: allAttachments,
    verifiedMachineCareChemicals: machineCareChems,
    serviceKits: [],
    seriesMachines,
    alternativeMachines,
    applicationChemicals,
    recommendedAccessories
  };
}

/**
 * REVERSE DISCOVERY: Given a part number or slug, which machines is it verified to fit?
 * Used on Part and Attachment product pages.
 */
export async function getProductMachineCompatibility(partNumberOrSlug: string) {
  const norm = normaliseCode(partNumberOrSlug);

  // 1. Check direct database/canonical relationships
  const rels = await getRawRelationships({
    target_id: partNumberOrSlug,
    relationship_domain: 'COMPATIBILITY',
    status: 'published',
    activeOnly: true
  });

  const verified = rels.filter(r => 
    ['VERIFIED', 'MANUFACTURER_SUPPORTED', 'UK_ENGINEERING_VERIFIED'].includes(r.confidence)
  );

  const matchedSlugs = new Set<string>();
  const results: Array<{
    machine_slug: string;
    model_code: string;
    name: string;
    category: string;
    pressure_bar?: number | null;
    flow_rate_lpm?: number | null;
    confidence: string;
    evidence?: string | null;
  }> = [];

  for (const r of verified) {
    const machine = await getProductBySlug(r.source_id);
    if (machine && !matchedSlugs.has(machine.slug)) {
      matchedSlugs.add(machine.slug);
      results.push({
        machine_slug: machine.slug,
        model_code: machine.model_code || machine.name,
        name: machine.name,
        category: machine.category,
        pressure_bar: machine.pressure_bar,
        flow_rate_lpm: machine.flow_rate_lpm,
        confidence: r.confidence,
        evidence: r.evidence
      });
    }
  }

  // 2. Check PARTS_CATALOGUE_V2 compatible_machines array
  const part = PARTS_CATALOGUE_V2.find(
    p => normaliseCode(p.slug) === norm || normaliseCode(p.part_number) === norm
  );

  if (part && Array.isArray(part.compatible_machines)) {
    const allProducts = await getProducts();
    for (const code of part.compatible_machines) {
      const cNorm = normaliseCode(code);
      const matches = allProducts.filter(p => {
        const pNorm = normaliseCode(p.model_code || p.slug);
        return pNorm === cNorm || (cNorm.length >= 3 && pNorm.includes(cNorm));
      });

      for (const m of matches) {
        if (!matchedSlugs.has(m.slug)) {
          matchedSlugs.add(m.slug);
          results.push({
            machine_slug: m.slug,
            model_code: m.model_code || m.name,
            name: m.name,
            category: m.category,
            pressure_bar: m.pressure_bar,
            flow_rate_lpm: m.flow_rate_lpm,
            confidence: 'VERIFIED',
            evidence: `OEM factory cross-reference: ${part.name} is specified for Alkota ${code}`
          });
        }
      }
    }
  }

  // 3. Check VERIFIED_ATTACHMENTS
  const att = VERIFIED_ATTACHMENTS.find(
    a => normaliseCode(a.slug) === norm || normaliseCode(a.part_number) === norm
  );

  if (att && Array.isArray(att.compatible_machines)) {
    const allProducts = await getProducts();
    for (const c of att.compatible_machines) {
      if (c.status === 'compatible') {
        const cNorm = normaliseCode(c.machine_model_code || c.machine_slug);
        const matches = allProducts.filter(p => {
          const pNorm = normaliseCode(p.model_code || p.slug);
          return pNorm === cNorm || (cNorm.length >= 3 && pNorm.includes(cNorm));
        });

        for (const m of matches) {
          if (!matchedSlugs.has(m.slug)) {
            matchedSlugs.add(m.slug);
            results.push({
              machine_slug: m.slug,
              model_code: m.model_code || m.name,
              name: m.name,
              category: m.category,
              pressure_bar: m.pressure_bar,
              flow_rate_lpm: m.flow_rate_lpm,
              confidence: 'VERIFIED',
              evidence: `Alkota Attachment Verification: Rated within machine operating envelope (${m.pressure_bar || 0} BAR, ${m.flow_rate_lpm || 0} LPM)`
            });
          }
        }
      }
    }
  }

  return results;
}

export interface PartEcosystem {
  verifiedMachines: Array<{
    machine_slug: string;
    model_code: string;
    name: string;
    category: string;
    pressure_bar?: number | null;
    flow_rate_lpm?: number | null;
    confidence: string;
    evidence?: string | null;
  }>;
  serviceKits: Array<{
    id: string;
    kit_number: string;
    name: string;
    slug: string;
    service_purpose?: string;
    price?: number | null;
    included_parts_summary?: string[];
  }>;
  accessories: Array<{
    id: string;
    title: string;
    slug: string;
    category?: string;
    tagline?: string;
    image_url?: string | null;
    price?: number | null;
    href: string;
  }>;
  supersedingPart: any | null;
}

/**
 * Returns the complete ecosystem surrounding a part:
 * - Confirmed compatible machines (with evidence citations)
 * - Associated service kits (kits that service this part or contain it)
 * - Recommended accessories (Domain: GENERAL)
 * - Superseding part details (if discontinued or superseded)
 */
export async function getPartEcosystem(part: {
  id: string;
  part_number: string;
  slug: string;
  category?: string;
  superseded_by?: string | null;
  compatible_machines?: string[] | null;
}): Promise<PartEcosystem> {
  // 1. Confirmed Machines
  const verifiedMachines = await getProductMachineCompatibility(part.slug || part.part_number);

  // 2. Service Kits
  let serviceKits: any[] = [];
  try {
    // Check service_kit_items
    const { data: kitItems } = await supabaseAdmin
      .from('service_kit_items')
      .select('kit_id')
      .or(`part_id.eq.${part.id},part_number.eq.${part.part_number}`);

    const kitIds = Array.from(new Set((kitItems || []).map((i: any) => i.kit_id).filter(Boolean)));

    if (kitIds.length > 0) {
      const { data: kits } = await supabaseAdmin
        .from('service_kits')
        .select('*')
        .in('id', kitIds)
        .eq('active', true);
      if (kits && kits.length > 0) {
        serviceKits = kits;
      }
    }

    // Fallback: If no direct items, check if service kit matches pump/burner
    if (serviceKits.length === 0) {
      const { data: allKits } = await supabaseAdmin
        .from('service_kits')
        .select('*')
        .eq('active', true);

      const pUpper = part.part_number.toUpperCase();
      const nameUpper = (part as any).name?.toUpperCase() || '';

      serviceKits = (allKits || []).filter((k: any) => {
        const kStr = `${k.kit_number} ${k.name} ${(k.included_parts_summary || []).join(' ')}`.toUpperCase();
        return (
          kStr.includes(pUpper) ||
          (nameUpper.includes('TS2021') && k.kit_number.includes('TS2021')) ||
          (nameUpper.includes('BECKETT') && k.kit_number.includes('BECKETT')) ||
          (nameUpper.includes('4000') && k.kit_number.includes('4000'))
        );
      });
    }
  } catch {
    // Graceful fallback
  }

  // 3. Recommended Accessories (Domain: GENERAL)
  const canonicalAccessories = CANONICAL_RELATIONSHIPS.filter(r =>
    r.relationship_domain === 'GENERAL' &&
    ['ACCESSORY', 'RELATED_ACCESSORY', 'RECOMMENDED_PRODUCT'].includes(r.relationship_type)
  );

  const accessories = canonicalAccessories.slice(0, 4).map(a => ({
    id: a.id,
    title: a.target_id.replace(/-/g, ' ').toUpperCase(),
    slug: a.target_id,
    category: 'attachments',
    tagline: a.notes || 'Recommended accessory for enhanced wash bay operation.',
    image_url: null,
    price: null,
    href: `/parts-attachments/product/${a.target_id}`,
  }));

  // 4. Supersession Part Details
  let supersedingPart: any = null;
  if (part.superseded_by) {
    try {
      const { data: rep } = await supabaseAdmin
        .from('parts')
        .select('id, part_number, name, slug, price, in_stock, image_url, description')
        .or(`part_number.eq.${part.superseded_by},sku.eq.${part.superseded_by},slug.eq.${part.superseded_by}`)
        .eq('active', true)
        .maybeSingle();

      if (rep) {
        supersedingPart = rep;
      }
    } catch {
      // Graceful fallback
    }
  }

  return {
    verifiedMachines,
    serviceKits,
    accessories,
    supersedingPart,
  };
}

