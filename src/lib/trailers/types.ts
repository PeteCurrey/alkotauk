export type TrailerFormat = 'open-deck' | 'enclosed';

export interface UKChassisOption {
  id: string;
  name: string;
  format: TrailerFormat;
  axles: 'single' | 'tandem';
  mam_kg: number; // Maximum Authorised Mass
  tare_weight_kg: number; // Unladen chassis weight
  max_payload_kg: number;
  deck_length_mm: number;
  deck_width_mm: number;
  overall_length_mm: number;
  overall_width_mm: number;
  body_height_mm?: number;
  braked: boolean;
  hitch_type: string;
  wheel_size: string;
  suspension: string;
  uk_approval_type: string;
  description: string;
  suitable_for: string[];
  max_tank_litres: number;
  max_machine_count: number;
  guide_price_gbp?: number;
}

export interface TrailerMachineOption {
  id: string;
  model_code: string;
  name: string;
  series: string;
  category: 'hot-water' | 'cold-water' | 'steam';
  pressure_bar: number;
  pressure_psi: number;
  flow_lpm: number;
  flow_gpm: number;
  power_source: string;
  engine_details: string;
  heating_fuel: string;
  dry_weight_kg: number;
  max_temp_c: number;
  dual_gun_capable: boolean;
  dimensions_mm: string;
  image_url: string;
  description: string;
  duty_cycle: string;
  primary_application: string[];
  guide_price_gbp?: number;
}

export interface WaterStorageOption {
  id: string;
  litres: number;
  gallons_uk: number;
  tank_type: string;
  material: string;
  baffled: boolean;
  hardware_weight_kg: number;
  dimensions_mm: string;
  auto_fill_capable: boolean;
  low_water_shutoff: boolean;
  description: string;
  guide_price_gbp?: number;
}

export interface PowerFuelOption {
  id: string;
  name: string;
  category: 'generator' | 'fuel-tank' | 'electrical' | 'battery';
  weight_kg: number;
  output_rating?: string;
  fuel_capacity_litres?: number;
  description: string;
  compatible_formats: TrailerFormat[];
  guide_price_gbp?: number;
}

export interface WaterRecoveryOption {
  id: string;
  name: string;
  tier: 'none' | 'vacuum-recovery' | 'vfs-filtration' | 'closed-loop-recycle';
  weight_kg: number;
  power_draw_kw?: number;
  flow_capacity_lpm?: number;
  vacuum_lift_inches?: number;
  description: string;
  filtration_stages?: string[];
  environmental_standard: string;
  dimensions_mm: string;
  guide_price_gbp?: number;
}

export interface HoseStorageOption {
  id: string;
  name: string;
  category: 'hp-reel' | 'inlet-reel' | 'vacuum-reel' | 'vault' | 'surface-cleaner' | 'racks';
  weight_kg: number;
  length_metres?: number;
  description: string;
  guide_price_gbp?: number;
}

export interface SiteOption {
  id: string;
  name: string;
  category: 'lighting' | 'winterisation' | 'safety' | 'controls';
  weight_kg: number;
  description: string;
  guide_price_gbp?: number;
}

export interface FinishLiveryOption {
  id: string;
  name: string;
  format: TrailerFormat;
  tier: 'stealth' | 'logo-package' | 'full-wrap' | 'custom-paint';
  color_hex?: string;
  color_name?: string;
  description: string;
  guide_price_gbp?: number;
}

export interface StartingConfiguration {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  badge?: string;
  format: TrailerFormat;
  chassis_id: string;
  machine_id: string;
  operator_count: 1 | 2;
  water_storage_id: string;
  recovery_option_id: string;
  power_options: string[];
  hose_storage_options: string[];
  site_options: string[];
  finish_livery_id: string;
  guide_price_display: string;
  ideal_for: string[];
  image_url: string;
  description: string;
}

export interface CommercialValueEstimate {
  price_state: 'verified' | 'guide_range' | 'engineering_quote_only';
  min_guide_price_gbp?: number;
  max_guide_price_gbp?: number;
  guide_price_display: string;
  price_confidence: 'high' | 'partial' | 'bespoke_costing_required';
}

export interface TrailerOpportunityScore {
  score: number; // 0 to 100
  tier: 'priority' | 'active' | 'developing' | 'configuration_only';
  signals: string[];
}

export interface TrailerConfiguration {
  id?: string;
  schema_version?: string; // e.g. '1.1.0'
  build_code: string;
  format: TrailerFormat;
  chassis_id: string;
  machine_id: string;
  operator_count: 1 | 2;
  water_storage_id: string;
  power_options: string[];
  recovery_option_id: string;
  hose_storage_options: string[];
  site_options: string[];
  finish_livery_id: string;
  custom_body_color?: string;
  logo_url?: string;
  company_name_livery?: string;
  
  // Operational Context (from questionnaire)
  operational_context?: {
    industry?: string;
    dirt_type?: string;
    daily_run_hours?: string;
    requires_steam?: boolean;
    requires_recovery?: boolean;
    tow_vehicle_make_model?: string;
    tow_vehicle_max_braked_kg?: number;
    purchase_driver?: string;
    replacing_existing?: string;
    target_budget?: string;
  };

  // User details (optional until enquiry submission)
  contact?: {
    name: string;
    company: string;
    email: string;
    phone: string;
    postcode: string;
    timeline?: string;
    commercial_intent?: 'engineering_review' | 'request_quote';
    marketing_consent?: boolean;
    notes?: string;
  };

  // Commercial & Admin Metadata
  created_by?: 'customer' | 'staff';
  sales_owner?: string;
  engineering_owner?: string;
  engineering_status?: 'technically_approved' | 'revision_required' | 'info_required' | 'non_standard' | 'pending';
  pipeline_stage?: 'new' | 'qualified' | 'engineering_review' | 'costing' | 'quote_sent' | 'negotiation' | 'won' | 'lost';
  lost_reason?: string;
  quote_reference?: string;
  revision_number?: number;
  revision_notes?: string;
  view_count?: number;
  last_viewed_at?: string;

  created_at?: string;
  updated_at?: string;
}

export interface ConfigurationWeights {
  chassis_tare_kg: number;
  machine_dry_kg: number;
  water_tank_hardware_kg: number;
  water_mass_kg: number; // 1L = 1kg
  power_options_kg: number;
  recovery_equipment_kg: number;
  hose_storage_kg: number;
  site_options_kg: number;
  estimated_dry_weight_kg: number;
  estimated_wet_weight_kg: number; // Dry + full water
  chassis_mam_kg: number;
  payload_margin_kg: number; // MAM - wet weight
  payload_utilization_pct: number;
  is_overweight: boolean;
  weight_status: 'optimal' | 'warning' | 'critical-overweight';
  confidence_status: 'verified' | 'partial-estimate';
}

export interface ValidationIssue {
  field: string;
  code: string;
  severity: 'hard-error' | 'engineering-review' | 'recommendation';
  message: string;
  resolution: string;
}

export interface ConfigurationValidationResult {
  isValid: boolean;
  hardErrors: ValidationIssue[];
  warnings: ValidationIssue[];
  recommendations: ValidationIssue[];
  isDualGunAllowed: boolean;
  maxAllowedTankLitres: number;
}

export interface TowVehicleAssessment {
  towing_capacity_kg?: number;
  is_compatible: boolean;
  status_message: string;
  margin_kg?: number;
}

export interface EnduranceCalculation {
  tank_litres: number;
  flow_lpm: number;
  operator_count: number;
  effective_flow_lpm: number;
  continuous_minutes: number;
  typical_trigger_hours: number; // factoring 60% trigger time
}

// ─── PHASE 06: BUILD LIFECYCLE TYPES ─────────────────────────────────────────

export type BuildStageId =
  | 'order_confirmed'
  | 'engineering_release'
  | 'chassis_received'
  | 'fabrication'
  | 'equipment_installation'
  | 'plumbing_fluid_systems'
  | 'electrical_power'
  | 'water_recovery_integration'
  | 'livery_finish'
  | 'system_testing'
  | 'quality_check'
  | 'ready_for_handover'
  | 'delivered';

export type BuildStageStatus = 'not_started' | 'in_progress' | 'blocked' | 'complete';

export type BuildProjectStatus =
  | 'order_confirmed'
  | 'in_production'
  | 'blocked'
  | 'quality_check'
  | 'ready_for_handover'
  | 'delivered';

export interface BuildStage {
  id: BuildStageId;
  internal_label: string;
  customer_label: string;
  status: BuildStageStatus;
  started_at?: string;
  completed_at?: string;
  blocked_reason?: string; // internal only — never expose to customer
  technician?: string;
}

export interface BuildUpdate {
  id: string;
  date: string;
  message: string; // customer-visible approved update
  is_milestone: boolean;
  stage_id?: BuildStageId;
  photo_url?: string; // approved photo only
}

export interface ComponentSerial {
  id: string;
  category: 'chassis' | 'machine' | 'engine' | 'pump' | 'burner' | 'generator' | 'recovery' | 'hose_reel' | 'water_treatment' | 'other';
  description: string;
  make?: string;
  model?: string;
  serial_number?: string;
  vin?: string; // chassis only
  notes?: string;
}

export interface HandoverDocument {
  id: string;
  type:
    | 'final_specification'
    | 'machine_manual'
    | 'engine_manual'
    | 'generator_manual'
    | 'warranty'
    | 'trailer_docs'
    | 'service_info'
    | 'maintenance_schedule'
    | 'training_record'
    | 'certificate'
    | 'photographs'
    | 'other';
  title: string;
  revision: string;
  date: string;
  customer_visible: boolean;
  url?: string;
  superseded: boolean;
  notes?: string;
}

export interface HandoverChecklistItem {
  id: string;
  test_type: string;
  description: string;
  // Conditions that must be true for this item to apply. 'always' means unconditional.
  required_for: Array<'always' | 'enclosed' | 'dual_operator' | 'recovery' | 'generator' | 'closed_loop' | 'vfs_filtration' | 'vacgd'>;
  result?: 'pass' | 'fail' | 'retest_required' | 'not_applicable';
  date?: string;
  technician?: string;
  notes?: string;
}

export interface BuildMediaItem {
  id: string;
  stage_id?: BuildStageId;
  filename: string;
  url: string;
  alt_text: string;
  caption?: string;
  classification: 'internal_only' | 'customer_visible' | 'marketing_approved' | 'hero';
  uploaded_at: string;
  uploaded_by: string;
}

export interface CustomerApproval {
  id: string;
  type: 'livery' | 'layout' | 'specification_revision';
  title: string;
  version: number;
  document_url?: string;
  submitted_at: string;
  status: 'pending_customer_approval' | 'approved' | 'changes_requested';
  approved_at?: string;
  approved_by?: string;
  customer_notes?: string;
}

export interface ServiceScheduleItem {
  id: string;
  component: string;
  service_type: string;
  interval_months?: number;
  next_due_date?: string;
  last_completed_date?: string;
  status: 'current' | 'due_soon' | 'overdue';
  assigned_provider?: string;
}

export interface ServiceHistoryEntry {
  id: string;
  date: string;
  service_type: string;
  engineer: string;
  work_completed: string;
  parts_used: string[];
  recommendations?: string;
  next_due?: string;
  customer_visible: boolean;
  report_url?: string;
}

export interface WeightRecord {
  estimated_dry_kg: number;
  estimated_wet_kg: number;
  verified_finished_weight_kg?: number;
  verified_at?: string;
  verified_by?: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  performed_by: string;
  performed_at: string;
  previous_value?: string;
  new_value?: string;
  notes?: string;
}

export interface TrailerBuildProject {
  id: string; // internal DB ID — never expose publicly
  build_reference: string; // ABP-YYMM-NNN
  build_code: string; // AKT-XXXXXX-UK from configurator
  quote_reference?: string;

  // Accepted from the won opportunity
  accepted_configuration: TrailerConfiguration;
  accepted_revision: number;

  // Customer / project identity
  customer_name: string;
  customer_company: string;
  customer_email: string;
  customer_phone?: string;
  customer_site?: string;

  // Ownership
  project_owner?: string;
  engineering_owner?: string;
  production_owner?: string;
  status: BuildProjectStatus;

  // Dates
  order_confirmed_at: string;
  target_handover_date?: string; // internal working target
  confirmed_handover_date?: string; // communicated to customer
  actual_handover_date?: string;
  target_customer_visible: boolean; // admin controls visibility

  // Production
  stages: BuildStage[];
  updates: BuildUpdate[];
  component_serials: ComponentSerial[];
  media: BuildMediaItem[];
  customer_approvals: CustomerApproval[];

  // Specification
  weights: WeightRecord;
  final_engineering_notes?: string;

  // Handover
  handover_checklist: HandoverChecklistItem[];
  handover_documents: HandoverDocument[];
  handover_completed: boolean;
  handover_customer_representative?: string;
  handover_date?: string;
  training_completed: boolean;
  training_notes?: string;

  // Asset
  asset_created: boolean;
  qr_token?: string; // random safe token, never the DB id
  warranty_start?: string;
  warranty_end?: string;
  warranty_covered_equipment?: string[];
  service_schedule?: ServiceScheduleItem[];
  service_history?: ServiceHistoryEntry[];
  service_contract_type?: string;
  service_contract_start?: string;
  service_contract_end?: string;

  // Commercial intelligence
  case_study_candidate: boolean;
  marketing_permission: boolean;

  // Audit
  audit_log: AuditLogEntry[];

  created_at: string;
  updated_at: string;
}
