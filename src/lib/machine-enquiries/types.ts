import { MatchStatus, SelectionRequirements } from '@/lib/machine-selection/types';

export type MachineEnquirySource = 
  | 'machine_selector' 
  | 'machine_comparison' 
  | 'direct_machine' 
  | 'request_pricing' 
  | 'service' 
  | 'general';

export interface EnquiryMachineItem {
  id?: string;
  slug: string;
  model_code: string;
  name: string;
  category: string;
  series?: string | null;
  pressure_bar: number | null;
  flow_rate_lpm: number | null;
  power_source: string | null;
  heating_fuel: string | null;
  voltage: string | null;
  phase: number | null;
  primary_image_url: string | null;
  server_match_status?: MatchStatus;
  reasons?: string[];
  unknowns?: string[];
  failure_reasons?: string[];
}

export interface EvaluatedMachineResult {
  slug: string;
  model_code: string;
  name: string;
  category: string;
  server_match_status: MatchStatus;
  specs_verified: boolean;
  reasons: string[];
  unknowns: string[];
  failure_reasons: string[];
}

export interface ServerRevalidationResult {
  timestamp: string;
  source: MachineEnquirySource;
  is_valid: boolean;
  has_requirements: boolean;
  evaluated_machines: EvaluatedMachineResult[];
  requires_human_confirmation: boolean;
  confirmation_items: string[];
  discrepancy_detected: boolean;
  discrepancy_details?: string[];
  audit_note: string;
}

export interface MachineEnquiryMetadata {
  machine_source: MachineEnquirySource;
  machines: EnquiryMachineItem[];
  revalidation_result: ServerRevalidationResult;
  structured_requirements?: Partial<SelectionRequirements> | null;
  requirements_summary?: string[];
  site_power?: string | null;
  site_water?: string | null;
  timeline?: string | null;
  budget_range?: string | null;
  postcode?: string | null;
}
