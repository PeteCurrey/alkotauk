export type PartAvailability =
  | 'in_stock'
  | 'low_stock'
  | 'backorder'
  | 'special_order'
  | 'obsolete'
  | 'check_availability';

export type PartCategorySlug =
  | 'pumps'
  | 'burners'
  | 'coils'
  | 'valves-unloaders'
  | 'hoses'
  | 'trigger-guns'
  | 'lances-nozzles'
  | 'filters'
  | 'electrical-switches'
  | 'engines-motors'
  | 'fuel-system'
  | 'fittings-couplers'
  | 'seals-o-rings'
  | 'service-kits'
  | 'other';

export interface PartCategoryDef {
  slug: PartCategorySlug;
  name: string;
  shortDesc: string;
  iconName: string;
  popularParts: string[];
}

export interface PartDocument {
  title: string;
  type: 'parts_manual' | 'schematic' | 'spec_sheet' | 'service_bulletin';
  url: string;
  revisionDate?: string;
  restrictedLevel?: 'public' | 'dealer' | 'internal';
}

export interface Part {
  id: string;
  part_number: string;
  name: string;
  slug: string;
  description?: string | null;
  category: PartCategorySlug | string;
  assembly_category?: string | null;
  manufacturer?: string | null;
  price?: number | null;
  in_stock: boolean;
  availability_status: PartAvailability;
  superseded_by?: string | null;
  weight_kg?: number | null;
  technical_notes?: string | null;
  documents?: PartDocument[];
  compatible_machines?: string[];
  image_url?: string | null;
  oem_genuine: boolean;
  active: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface DiagramCallout {
  id: string;
  assembly_id: string;
  callout_number: number;
  x_percent: number; // 0 - 100
  y_percent: number; // 0 - 100
  part_id?: string;
  part_number: string;
  part_name: string;
  quantity_used: number;
  superseded_by?: string | null;
  notes?: string | null;
  price?: number | null;
}

export interface PartAssembly {
  id: string;
  name: string;
  slug: string;
  machine_model_code: string;
  machine_slug?: string;
  category: string;
  description?: string;
  diagram_image_url?: string;
  diagram_svg_path?: string;
  diagram_pdf_url?: string;
  callouts: DiagramCallout[];
  sort_order: number;
  active: boolean;
}

export interface PartMachineCompatibility {
  id: string;
  part_id: string;
  machine_model_code: string;
  machine_slug?: string;
  machine_family?: string;
  assembly_name?: string;
  serial_from?: string;
  serial_to?: string;
  quantity_used: number;
  notes?: string;
}

export interface ServiceKit {
  id: string;
  kit_number: string;
  name: string;
  slug: string;
  description: string;
  service_purpose: string;
  service_interval_hours?: number;
  compatible_machine_codes: string[];
  included_parts_summary: string[];
  price?: number | null;
  in_stock: boolean;
  image_url?: string | null;
  active: boolean;
  items?: {
    part_number: string;
    part_name: string;
    quantity: number;
    notes?: string;
  }[];
}

export interface PartRequestItem {
  part_number: string;
  name: string;
  quantity: number;
  machine_context?: string;
  price_each?: number | null;
}

export interface PartRequestSubmission {
  id?: string;
  customer_name: string;
  company?: string;
  email: string;
  phone?: string;
  postcode?: string;
  machine_model?: string;
  serial_number?: string;
  urgency: 'emergency_breakdown' | 'urgent' | 'standard' | 'planned_maintenance';
  requested_parts: PartRequestItem[];
  photo_urls?: string[];
  notes?: string;
}

export interface MachinePartsProfile {
  machineModelCode: string;
  machineName: string;
  machineSlug: string;
  series: string;
  category: string;
  primaryImageUrl: string;
  specsSummary: string;
  serialLocationGuide: string;
  assemblies: PartAssembly[];
  serviceKits: ServiceKit[];
  documents: PartDocument[];
}
