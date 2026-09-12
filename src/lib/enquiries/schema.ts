/**
 * Alkota UK — Canonical Enquiry & Machine Data Model Schema
 * Phase 7.0
 * 
 * Strict typing for:
 * 1. Canonical Enquiry Entity
 * 2. Enquiry Machines Relationship Entity
 * 3. Public Submission API Contract
 */

import { ApplicationId, WaterTypeRequirement, PowerPreference, VoltagePreference, PhasePreference, MobilityPreference, MatchStatus } from '@/lib/machine-selection/types';

export type EnquirySource = 
  | 'MACHINE_DETAIL'
  | 'MACHINE_SELECTOR'
  | 'MACHINE_COMPARISON'
  | 'MACHINE_CATALOGUE'
  | 'PARTS'
  | 'ATTACHMENTS'
  | 'CHEMICALS'
  | 'DEALER'
  | 'GENERAL';

export type EnquiryContext = 
  | 'DIRECT_MACHINE'
  | 'MACHINE_SELECTION'
  | 'MACHINE_COMPARISON'
  | 'GENERAL_PRODUCT'
  | 'GENERAL_ENQUIRY';

export type EnquiryStatus = 
  | 'new'
  | 'acknowledged'
  | 'contacted'
  | 'qualifying'
  | 'quoting'
  | 'won'
  | 'lost'
  | 'closed'
  | 'read'
  | 'responded'
  | 'in-progress'
  | 'archived';

export type SelectionOutcome = 
  | 'STRONG_MATCH'
  | 'POSSIBLE_MATCH'
  | 'NO_VERIFIED_MATCH'
  | 'DOES_NOT_MEET'
  | 'NOT_APPLICABLE';

export type MachineRole = 
  | 'PRIMARY'
  | 'SHORTLIST'
  | 'COMPARISON'
  | 'SELECTED';

export type RevalidationStatus = 
  | 'VALID'
  | 'DISCREPANCY_DETECTED'
  | 'SKIPPED';

/**
 * Minimal verified technical snapshot at enquiry time.
 * Preserves historical accuracy even if catalog specs change.
 */
export interface MinimalMachineSpecsSnapshot {
  pressure_bar?: number | null;
  flow_rate_lpm?: number | null;
  power_source?: string | null;
  heating_fuel?: string | null;
  voltage?: string | null;
  phase?: number | null;
}

/**
 * Normalised machine record in the enquiry_machines relationship table.
 */
export interface CanonicalEnquiryMachineRecord {
  id?: string;
  enquiry_id?: string;
  machine_id: string; // product slug or canonical identifier
  product_id?: string | null; // UUID reference to products table
  model_code_snapshot: string;
  machine_name_snapshot: string;
  slug_snapshot: string;
  category_snapshot: string;
  role: MachineRole;
  display_order: number;
  selection_status?: MatchStatus | 'NOT_APPLICABLE' | null;
  match_reasons?: string[];
  unknown_criteria?: string[];
  failure_reasons?: string[];
  specs_snapshot?: MinimalMachineSpecsSnapshot;
  created_at?: string;
}

/**
 * Canonical Enquiry Record matching the 028 schema.
 */
export interface CanonicalEnquiryRecord {
  id?: string;
  reference: string;
  source: EnquirySource;
  enquiry_context: EnquiryContext;
  status: EnquiryStatus;
  
  // Customer details
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  postcode?: string | null;
  preferred_contact_method?: 'email' | 'phone' | 'either';
  message?: string | null;
  subject?: string | null;

  // Site Readiness
  site_power?: string | null;
  site_water?: string | null;
  timeline?: string | null;
  budget_range?: string | null;

  // Structured Requirements (Option C: Minimal Hybrid)
  req_application?: ApplicationId | string | null;
  req_water_type?: WaterTypeRequirement | string | null;
  req_min_pressure_bar?: number | null;
  req_min_flow_lpm?: number | null;
  req_power_source?: PowerPreference | string | null;
  req_voltage?: VoltagePreference | string | null;
  req_phase?: string | null;
  req_mobility?: MobilityPreference | string | null;
  requirements?: Record<string, any>;

  // Selection Outcome & Revalidation
  selector_version?: string | null;
  selection_outcome?: SelectionOutcome | null;
  revalidation_status?: RevalidationStatus;
  discrepancy_detected?: boolean;
  discrepancy_details?: string[];
  requires_human_confirmation?: boolean;
  unknown_criteria?: string[];
  confirmation_items?: string[];
  revalidated_at?: string | null;

  // Attribution
  dealer_id?: string | null;
  source_page?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;

  // Internal Audit & Extensibility
  admin_notes?: string | null;
  assigned_to?: string | null;
  follow_up_date?: string | null;
  metadata?: Record<string, any>;
  
  created_at?: string;
  updated_at?: string;
}

/**
 * Public submission contract payload for /api/enquiries or /api/contact
 */
export interface SubmitEnquiryPayload {
  customer: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    postcode?: string;
    preferredContactMethod?: 'email' | 'phone' | 'either';
  };
  source: EnquirySource;
  context?: EnquiryContext;
  subject?: string;
  message?: string;
  machines?: Array<{
    identifier: string; // model code or slug
    role?: MachineRole;
    displayOrder?: number;
  }>;
  requirements?: {
    application?: string;
    waterType?: string;
    minPressureBar?: number | null;
    minFlowLpm?: number | null;
    powerSource?: string;
    voltage?: string;
    phase?: any;
    mobility?: string;
    tankRequired?: boolean;
    minTankCapacityL?: number | null;
    preferences?: string[];
    unitSystem?: 'metric' | 'imperial';
  };
  siteReadiness?: {
    sitePower?: string;
    siteWater?: string;
    timeline?: string;
    budgetRange?: string;
  };
  attribution?: {
    sourcePage?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    dealerId?: string;
  };
}
