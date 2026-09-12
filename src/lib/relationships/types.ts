// ─── ALKOTA UK — PRODUCT RELATIONSHIP & COMPATIBILITY TYPES ────────────────
// Explicit separation between:
// 1. COMPATIBILITY (Engineering claims: fitment, operation, specification)
// 2. GENERAL (Commercial, discovery, lifecycle, recommendations)

export type RelationshipDomain = 'COMPATIBILITY' | 'GENERAL';

export type ProductType = 
  | 'machine' 
  | 'part' 
  | 'attachment' 
  | 'chemical' 
  | 'accessory' 
  | 'document' 
  | 'other';

export type RelationshipStatus = 
  | 'draft' 
  | 'review' 
  | 'verified' 
  | 'published' 
  | 'rejected' 
  | 'archived';

export type RelationshipConfidence = 
  | 'VERIFIED' 
  | 'MANUFACTURER_SUPPORTED' 
  | 'UK_ENGINEERING_VERIFIED' 
  | 'REVIEW_REQUIRED' 
  | 'NOT_COMPATIBLE';

// ─── CONTROLLED COMPATIBILITY VOCABULARY ─────────────────────────────────────
export type CompatibilityType =
  | 'MACHINE_PART'
  | 'MACHINE_ATTACHMENT'
  | 'MACHINE_CHEMICAL'
  | 'MACHINE_ACCESSORY'
  | 'MACHINE_DOCUMENT'
  | 'PART_MACHINE'
  | 'ATTACHMENT_MACHINE'
  | 'CHEMICAL_MACHINE'
  | 'SERVICE_KIT_MACHINE';

// ─── CONTROLLED GENERAL RELATIONSHIP VOCABULARY ──────────────────────────────
export type GeneralRelationshipType =
  // Discovery
  | 'RELATED_PRODUCT'
  | 'SIMILAR_PRODUCT'
  | 'ALTERNATIVE_PRODUCT'
  | 'RECOMMENDED_PRODUCT'
  | 'RECOMMENDED_ALONGSIDE'
  // Commercial
  | 'CROSS_SELL'
  | 'UPSELL'
  | 'BUNDLE_COMPONENT'
  | 'FREQUENTLY_PURCHASED_WITH'
  // Product Lifecycle
  | 'REPLACEMENT_FOR'
  | 'REPLACED_BY'
  | 'SUCCESSOR_TO'
  | 'PREDECESSOR_TO'
  | 'UPGRADE_FROM'
  | 'UPGRADE_TO'
  // Product Family & Origin
  | 'SAME_PRODUCT_FAMILY'
  | 'SAME_SERIES'
  | 'SAME_MANUFACTURER'
  | 'SAME_APPLICATION'
  // Supporting Products
  | 'RELATED_ACCESSORY'
  | 'RELATED_SPARE'
  | 'RELATED_CONSUMABLE'
  | 'RELATED_CHEMICAL'
  | 'RELATED_DOCUMENT'
  | 'RELATED_SERVICE_ITEM';

export type RelationshipType = CompatibilityType | GeneralRelationshipType;

export interface ProductRelationship {
  id: string;
  source_id: string;        // Product slug, model_code, part_number, or chemical code
  source_type: ProductType;
  target_id: string;        // Target slug, part_number, or code
  target_type: ProductType;
  relationship_domain: RelationshipDomain;
  relationship_type: RelationshipType;
  status: RelationshipStatus;
  confidence: RelationshipConfidence;
  evidence?: string | null;
  source_url?: string | null;
  source_document?: string | null;
  verification_date?: string | null;
  verified_by?: string | null;
  notes?: string | null;
  sort_order: number;
  active: boolean;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface ResolvedRelationship {
  relationship: ProductRelationship;
  target: {
    id?: string;
    title: string;
    slug: string;
    category?: string;
    type: ProductType;
    image_url?: string | null;
    price?: number | null;
    code_or_number?: string;
    tagline_or_desc?: string;
    badge?: string;
    spec_summary?: string;
    href: string;
  };
}

export interface MachineEcosystem {
  // 1. Engineering Compatibility (Direct Evidence)
  compatibleParts: ResolvedRelationship[];
  compatibleAttachments: ResolvedRelationship[];
  verifiedMachineCareChemicals: ResolvedRelationship[];
  serviceKits: ResolvedRelationship[];

  // 2. General Relationships (Commercial, Discovery & Lifecycle)
  seriesMachines: ResolvedRelationship[];
  alternativeMachines: ResolvedRelationship[];
  applicationChemicals: ResolvedRelationship[];
  recommendedAccessories: ResolvedRelationship[];
}
