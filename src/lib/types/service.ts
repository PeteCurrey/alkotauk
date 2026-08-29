export type ServiceRequestType =
  | 'planned_maintenance'
  | 'breakdown'
  | 'pump_repair'
  | 'commissioning'
  | 'technical_support';

export type ServiceUrgency =
  | 'routine'
  | 'machine_down'
  | 'operating_with_fault'
  | 'planned_shutdown'
  | 'project_commissioning';

export type MachineStatus =
  | 'not_running'
  | 'reduced_performance'
  | 'leaking'
  | 'no_heat'
  | 'low_pressure'
  | 'electrical_fault'
  | 'unknown';

export type AssetCondition = 'good' | 'monitor' | 'action_required' | 'critical';

export type ServicePlanType =
  | 'planned_maintenance'
  | 'planned_reactive'
  | 'managed_equipment'
  | 'critical_operations';

export type RequestStatus =
  | 'new'
  | 'triage'
  | 'scheduled'
  | 'engineer_assigned'
  | 'in_progress'
  | 'parts_required'
  | 'quote_required'
  | 'completed'
  | 'closed';

export interface MachineRegistration {
  id: string;
  machine_slug?: string;
  model_code: string;
  serial_number: string;
  serial_plate_image_url?: string | null;
  purchase_date?: string;
  dealer_name?: string;
  company_name: string;
  site_name?: string;
  site_address?: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  operating_environment?: string;
  weekly_operating_hours?: number;
  status: 'pending_verification' | 'verified' | 'rejected';
  verified_at?: string;
  notes?: string;
  created_at: string;
}

export interface ServiceRequest {
  id: string;
  request_number: string;
  request_type: ServiceRequestType;
  urgency: ServiceUrgency;
  machine_registration_id?: string | null;
  machine_model: string;
  serial_number?: string;
  machine_status: MachineStatus;
  symptoms: string;
  error_codes?: string;
  photos?: string[];
  company_name: string;
  site_name?: string;
  site_address: string;
  site_postcode?: string;
  access_instructions?: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  status: RequestStatus;
  assigned_engineer?: string;
  scheduled_date?: string;
  internal_notes?: string;
  created_at: string;
}

export interface ServicePartUsed {
  part_number: string;
  name: string;
  quantity: number;
  unit_price?: number;
}

export interface ServiceReport {
  id: string;
  report_number: string;
  service_request_id?: string;
  machine_registration_id?: string;
  machine_model: string;
  serial_number: string;
  visit_date: string;
  engineer_name: string;
  visit_type: string;
  hours_reading?: number;
  pressure_reading_bar?: number;
  temp_reading_c?: number;
  flow_reading_lpm?: number;
  work_carried_out: string;
  asset_condition: AssetCondition;
  condition_notes?: string;
  parts_used: ServicePartUsed[];
  recommendations?: string;
  customer_signature_name?: string;
  pdf_url?: string;
  created_at: string;
}

export interface ServiceContract {
  id: string;
  contract_ref: string;
  plan_type: ServicePlanType;
  company_name: string;
  contact_name: string;
  contact_email: string;
  sites: { site_name: string; address: string; machine_count: number }[];
  covered_machines: { model: string; serial: string; site: string }[];
  start_date: string;
  end_date: string;
  renewal_date?: string;
  status: 'active' | 'pending_renewal' | 'expired' | 'cancelled';
  annual_value?: number;
  notes?: string;
  created_at: string;
}

export interface PPMScheduleItem {
  component: string;
  task: string;
  standard: string;
  frequency: '3_month' | '6_month' | '12_month' | '24_month' | '500_hours' | '1000_hours';
}

export interface PPMSchedule {
  machine_model: string;
  frequency_type: 'calendar_interval' | 'operating_hours' | 'both';
  recommended_kit_ref?: string;
  checklist_items: PPMScheduleItem[];
  notes?: string;
}

export interface TroubleshootingSymptom {
  id: string;
  title: string;
  category: 'pressure' | 'temperature' | 'electrical' | 'pump' | 'burner' | 'general';
  summary: string;
  safeChecks: string[];
  unsafeWarning: string;
  recommendedServiceType: ServiceRequestType;
}

export interface PumpManufacturerDef {
  name: string;
  models: string[];
  capabilities: string[];
  leadTimeDays: string;
}
