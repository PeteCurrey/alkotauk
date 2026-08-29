// ============================================================
// ALKOTA UK — WASH PLANT DIVISION TYPES & GOVERNANCE
// ============================================================

export type CapabilityTier = 'verified' | 'project_dependent' | 'future_ready';

export type CapabilityBadgeLabel =
  | 'VERIFIED ALKOTA BUILD'
  | 'PROJECT DEPENDENT'
  | 'ENGINEERED TO APPLICATION'
  | 'INTEGRATION AVAILABLE'
  | 'REMOTE MONITORING CAPABLE'
  | 'DATA-READY'
  | 'SUBJECT TO SITE SURVEY'
  | 'SUBJECT TO ENGINEERING REVIEW';

export type WashPlantStage =
  | 'new_enquiry'
  | 'qualification'
  | 'site_survey'
  | 'concept_design'
  | 'budget_proposal'
  | 'tender'
  | 'detailed_design'
  | 'quotation'
  | 'negotiation'
  | 'awarded'
  | 'engineering'
  | 'installation'
  | 'commissioning'
  | 'service_contract'
  | 'lost';

export type WashPlantArchitectureId =
  | 'manual_bay'
  | 'multi_operator'
  | 'automated_drive_through'
  | 'conveyorised_tunnel'
  | 'gantry_moving'
  | 'mat_sheet_rig'
  | 'heavy_demucking'
  | 'sanitary_process'
  | 'bespoke_engineering';

export type BudgetScopeIndicator =
  | 'Not yet established'
  | '< £100k'
  | '£100k–£250k'
  | '£250k–£500k'
  | '£500k–£1m'
  | '£1m+';

export interface WashPlantScopingPayload {
  step1: {
    asset_types: string[];
    other?: string;
  };
  step2: {
    dimensions: {
      length_mm?: string;
      width_mm?: string;
      height_mm?: string;
      weight_kg?: string;
    };
    no_spray_zones?: string;
    condition: string;
  };
  step3: {
    assets_per_hour?: string;
    assets_per_shift?: string;
    operating_hours_per_day: string;
    days_per_week: string;
    peak_throughput?: string;
    target_cycle_minutes?: string;
  };
  step4: {
    contamination: string[];
    other?: string;
  };
  step5: {
    preference: string;
  };
  step6: {
    mains_water: string;
    mains_flow_lpm?: string;
    reuse_required: string;
    existing_treatment: string;
    discharge: string;
  };
  step7: {
    site_type: string;
    location: string;
    footprint?: string;
    three_phase: string;
    heating_fuel: string;
    civils_required: string;
  };
  step8: {
    budget_band: string;
    target_date?: string;
    procurement_route: string;
    project_stage: string;
  };
  step9: {
    requirements: string[];
  };
  notes?: string;
}

export interface WashPlantProjectRecord {
  id: string;
  reference: string;
  status: WashPlantStage;
  client_name: string;
  client_company: string;
  client_email: string;
  client_phone: string;
  site_location?: string;
  project_name: string;
  estimated_value_gbp?: number;
  probability_pct: number;
  architect_data: WashPlantScopingPayload;
  application: string[];
  throughput_description?: string;
  contamination_profile: string[];
  automation_level: string;
  water_strategy?: string;
  site_type?: string;
  budget_band?: string;
  target_date?: string;
  procurement_route?: string;
  service_requirements: string[];
  service_opportunity: boolean;
  converted_to_asset_id?: string;
  published: boolean;
  visibility: 'public' | 'anonymised' | 'private';
  case_study_slug?: string;
  case_study_sector?: string;
  case_study_challenge?: string;
  case_study_scope?: string;
  case_study_architecture?: string;
  case_study_water_solution?: string;
  case_study_automation?: string;
  case_study_throughput?: string;
  client_testimonial?: string;
  client_testimonial_approved?: boolean;
  photo_urls?: Array<{ url: string; category: string; caption?: string }>;
  created_at: string;
  updated_at: string;
}

export interface WashPlantAssetHierarchyNode {
  id: string;
  type: 'system' | 'subsystem' | 'asset' | 'component';
  name: string;
  make?: string;
  model?: string;
  serial?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  age_years?: number;
  notes?: string;
  children?: WashPlantAssetHierarchyNode[];
}

export interface CriticalSpareItem {
  part_name: string;
  part_number: string;
  failure_consequence: 'critical_halt' | 'performance_loss' | 'minor_risk';
  recommended_qty: number;
  holding_location: 'site_held' | 'alkota_hub' | 'dual_consignment';
  lead_time_days: number;
  stock_status: 'available' | 'ordered' | 'low_stock';
  notes?: string;
}
