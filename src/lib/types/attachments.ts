export type AttachmentApplicationType =
  | 'surface_cleaning'
  | 'drain_pipe_cleaning'
  | 'chemical_foam_application'
  | 'long_reach_height'
  | 'coating_removal'
  | 'hose_management'
  | 'spray_control'
  | 'water_recovery'
  | 'multi_operator'
  | 'specialist';

export type AttachmentCategorySlug =
  | 'surface-cleaners'
  | 'hoses'
  | 'hose-reels'
  | 'trigger-guns'
  | 'lances'
  | 'nozzles'
  | 'foam-chemical-systems'
  | 'drain-pipe-cleaning'
  | 'turbo-rotary'
  | 'extension-telescopic'
  | 'water-recovery'
  | 'specialist';

export type AttachmentCompatibilityStatus =
  | 'compatible'
  | 'not_compatible'
  | 'requires_adapter'
  | 'technical_review';

export interface AttachmentTechnicalRatings {
  pressure_min_bar?: number;
  pressure_max_bar?: number;
  flow_min_lpm?: number;
  flow_max_lpm?: number;
  temperature_max_c?: number;
  connection_size?: string;       // e.g. '3/8" FPT', '1/4" QC', 'M22'
  hose_length_m?: number;
  working_width_mm?: number;
  weight_kg?: number;
}

export interface AttachmentMachineCompatibility {
  machine_slug: string;
  machine_model_code: string;
  machine_name: string;
  status: AttachmentCompatibilityStatus;
  notes?: string;
  requires_adapter?: string;
  limitation_reason?: string;
}

export interface AttachmentDocument {
  title: string;
  type: 'spec_sheet' | 'fitting_guide' | 'safety_data' | 'brochure';
  url: string;
  public: boolean;
}

export interface Attachment {
  id: string;
  part_number?: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  category: AttachmentCategorySlug;
  applications: AttachmentApplicationType[];
  ratings: AttachmentTechnicalRatings;
  compatible_machines?: AttachmentMachineCompatibility[];
  image_url?: string | null;
  documents?: AttachmentDocument[];
  price?: number | null;
  in_stock: boolean;
  featured: boolean;
  active: boolean;
  sort_order?: number;
  related_chemical_slugs?: string[];
  related_attachment_slugs?: string[];
}

export interface AttachmentCategoryDef {
  slug: AttachmentCategorySlug;
  name: string;
  shortDesc: string;
  applications: AttachmentApplicationType[];
}

export interface AttachmentApplicationDef {
  id: AttachmentApplicationType;
  title: string;
  shortDesc: string;
  technicalConsiderations: string[];
  primaryCategories: AttachmentCategorySlug[];
  imageSubject: string;
}
