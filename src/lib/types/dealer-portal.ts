// ============================================================
// ALKOTA UK — Dealer Portal TypeScript Types
// ============================================================

export type DealerPortalTier = 'standard' | 'silver' | 'gold' | 'platinum';
export type DealerCreditTerms = 'proforma' | '14_days' | '30_days' | '60_days' | 'account';
export type DealerStatus = 'active' | 'inactive' | 'draft';
export type DealerUserRole = 'owner' | 'manager' | 'sales' | 'parts' | 'service' | 'accounts';
export type ApplicationStatus = 'pending' | 'under_review' | 'more_info_required' | 'approved' | 'rejected';
export type SupportTicketStatus = 'open' | 'in_progress' | 'awaiting_dealer' | 'resolved' | 'closed';
export type DemoRequestStatus = 'requested' | 'under_review' | 'approved' | 'scheduled' | 'completed' | 'cancelled';
export type TrainingProgressStatus = 'not_started' | 'in_progress' | 'completed';
export type ResourceAccessLevel = 'public' | 'dealer' | 'tier_silver' | 'tier_gold' | 'tier_platinum' | 'specific' | 'internal';

// ─── Dealer Organisation ─────────────────────────────────────
export interface DealerOrg {
  id: string;
  slug: string;
  name: string;
  status: DealerStatus;
  tier: string; // existing public tier field
  portal_active: boolean;
  portal_tier: DealerPortalTier;
  account_manager: string | null;
  credit_terms: DealerCreditTerms;
  credit_limit: number | null;
  payment_terms: string | null;
  phone: string;
  email: string;
  website: string | null;
  address_line1: string;
  address_line2: string | null;
  town: string;
  county: string;
  postcode: string;
  country: string;
  company_reg: string | null;
  vat_number: string | null;
  approved_at: string | null;
  approved_by: string | null;
  suspended_at: string | null;
  suspension_reason: string | null;
  internal_notes: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Dealer User ─────────────────────────────────────────────
export interface DealerUser {
  id: string;
  dealer_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  job_title: string | null;
  phone: string | null;
  role: DealerUserRole;
  active: boolean;
  invited_at: string | null;
  invitation_accepted_at: string | null;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export function dealerUserFullName(user: DealerUser): string {
  if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`;
  if (user.first_name) return user.first_name;
  return user.email;
}

// ─── Dealer Application ──────────────────────────────────────
export interface DealerApplication {
  id: string;
  // Company
  company_name: string;
  trading_name: string | null;
  company_reg: string | null;
  vat_number: string | null;
  website: string | null;
  address_line1: string;
  address_line2: string | null;
  town: string;
  county: string;
  postcode: string;
  country: string;
  // Contact
  contact_name: string;
  job_title: string | null;
  email: string;
  phone: string;
  mobile: string | null;
  // Business
  years_in_business: number | null;
  years_trading: number | null;
  num_employees: number | null;
  business_type: string | null;
  current_turnover_range: string | null;
  industries_served: string[];
  geographic_territory: string | null;
  territory_interest: string;
  estimated_annual_sales: string | null;
  current_brands_represented: string | null;
  current_pw_brands: string | null;
  annual_pressure_washer_units: number | null;
  // Capabilities
  workshop_facilities: boolean;
  mobile_service_capability: boolean;
  service_van_count: number;
  parts_service_capability: boolean;
  // Interests
  dealer_interests: string[];
  // Supporting
  document_urls: string[];
  additional_notes: string | null;
  // Admin
  status: ApplicationStatus;
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  more_info_message: string | null;
  more_info_requested_at: string | null;
  decision_reason: string | null;
  converted_dealer_id: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Dealer Resource ─────────────────────────────────────────
export interface DealerResource {
  id: string;
  title: string;
  document_type: 'manual' | 'specification' | 'drawing' | 'sds' | 'marketing' |
                 'parts_diagram' | 'training' | 'bulletin' | 'brochure' | 'other';
  category: 'product_specs' | 'manuals' | 'engineering' | 'chemicals' |
            'parts' | 'marketing' | 'training' | 'general';
  product_id: string | null;
  product_name: string | null;
  version: string | null;
  revision_date: string | null;
  language: string;
  file_url: string;
  file_type: string | null;
  file_size_kb: number | null;
  thumbnail_url: string | null;
  access_level: ResourceAccessLevel;
  active: boolean;
  featured: boolean;
  downloads: number;
  created_at: string;
}

// ─── Dealer Announcement ─────────────────────────────────────
export interface DealerAnnouncement {
  id: string;
  title: string;
  body: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  audience_tiers: string[];
  attachment_urls: string[];
  published: boolean;
  published_at: string | null;
  expires_at: string | null;
  published_by: string | null;
  created_at: string;
}

// ─── Support Ticket ──────────────────────────────────────────
export interface DealerSupportTicket {
  id: string;
  ticket_number: string;
  dealer_id: string;
  dealer_user_id: string | null;
  category: 'technical' | 'parts' | 'product' | 'order' | 'warranty' |
            'service' | 'chemical' | 'marketing' | 'portal' | 'other';
  subject: string;
  description: string | null;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: SupportTicketStatus;
  assigned_to: string | null;
  attachment_urls: string[];
  created_at: string;
  updated_at: string;
}

// ─── Demo Request ────────────────────────────────────────────
export interface DealerDemoRequest {
  id: string;
  request_number: string;
  dealer_id: string;
  dealer_user_id: string | null;
  demo_type: 'customer' | 'dealer_day' | 'factory';
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  proposed_date: string | null;
  proposed_date_alt: string | null;
  location: string | null;
  customer_name: string | null;
  customer_company: string | null;
  customer_industry: string | null;
  machines_requested: string[];
  application_notes: string | null;
  expected_attendees: number | null;
  special_requirements: string | null;
  notes: string | null;
  status: DemoRequestStatus;
  scheduled_date: string | null;
  alkota_notes: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Training ────────────────────────────────────────────────
export interface DealerTraining {
  id: string;
  title: string;
  slug: string;
  category: 'product' | 'sales' | 'technical' | 'parts' | 'service' |
            'chemical' | 'safety' | 'new_product';
  description: string | null;
  video_url: string | null;
  document_urls: string[];
  duration_minutes: number | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  access_tier: DealerPortalTier;
  active: boolean;
  featured: boolean;
}

export interface DealerTrainingProgress {
  id: string;
  dealer_user_id: string;
  training_id: string;
  status: TrainingProgressStatus;
  started_at: string | null;
  completed_at: string | null;
  score: number | null;
}

export interface DealerTrainingEvent {
  id: string;
  title: string;
  event_type: 'classroom' | 'factory' | 'online' | 'product_launch' | 'workshop';
  description: string | null;
  event_date: string | null;
  event_time: string | null;
  location: string | null;
  max_places: number | null;
  registration_deadline: string | null;
  access_tier: string;
  active: boolean;
}

// ─── Notification ────────────────────────────────────────────
export interface DealerNotification {
  id: string;
  dealer_user_id: string;
  dealer_id: string;
  type: string;
  title: string;
  body: string | null;
  action_url: string | null;
  read: boolean;
  read_at: string | null;
  created_at: string;
}

// ─── Pricing Rule ────────────────────────────────────────────
export interface DealerPricingRule {
  id: string;
  rule_name: string;
  applies_to: 'tier' | 'specific_dealer' | 'all';
  dealer_id: string | null;
  portal_tier: string | null;
  product_id: string | null;
  part_id: string | null;
  product_category: string | null;
  discount_pct: number | null;
  price_override: number | null;
  valid_from: string | null;
  valid_to: string | null;
  active: boolean;
}

// ─── Dealer Address ──────────────────────────────────────────
export interface DealerAddress {
  id: string;
  dealer_id: string;
  address_type: 'delivery' | 'billing' | 'registered';
  address_name: string | null;
  company_name: string | null;
  address_line1: string;
  address_line2: string | null;
  town: string;
  county: string | null;
  postcode: string;
  country: string;
  is_default: boolean;
}

// ─── Audit Log ───────────────────────────────────────────────
export interface DealerAuditLog {
  id: string;
  action: string;
  actor_id: string | null;
  actor_type: 'admin' | 'dealer_user' | 'system';
  entity_type: string;
  entity_id: string | null;
  dealer_id: string | null;
  metadata: Record<string, unknown>;
  ip_address: string | null;
  created_at: string;
}

// ─── Session Extension ───────────────────────────────────────
export interface DealerPortalSession {
  dealerId: string;
  dealerName: string;
  dealerUserId: string;
  dealerUserRole: DealerUserRole;
  dealerTier: DealerPortalTier;
  userFirstName: string | null;
  userLastName: string | null;
  userEmail: string;
}

// ─── Role Permissions ────────────────────────────────────────
export interface RolePermissions {
  canOrder: boolean;
  canViewPricing: boolean;
  canManageUsers: boolean;
  canViewAllOrders: boolean;
  canDownloadResources: boolean;
  canAccessTraining: boolean;
  canSubmitSupport: boolean;
  canManageAccount: boolean;
  canRequestDemo: boolean;
  canAccessMarketing: boolean;
  canViewInvoices: boolean;
  canAccessParts: boolean;
  canAccessService: boolean;
}

export function getRolePermissions(role: DealerUserRole): RolePermissions {
  const base: RolePermissions = {
    canOrder: false,
    canViewPricing: false,
    canManageUsers: false,
    canViewAllOrders: false,
    canDownloadResources: true,
    canAccessTraining: true,
    canSubmitSupport: true,
    canManageAccount: false,
    canRequestDemo: false,
    canAccessMarketing: false,
    canViewInvoices: false,
    canAccessParts: false,
    canAccessService: false,
  };
  switch (role) {
    case 'owner':
      return { ...base, canOrder: true, canViewPricing: true, canManageUsers: true,
               canViewAllOrders: true, canManageAccount: true, canRequestDemo: true,
               canAccessMarketing: true, canViewInvoices: true, canAccessParts: true,
               canAccessService: true };
    case 'manager':
      return { ...base, canOrder: true, canViewPricing: true, canViewAllOrders: true,
               canManageAccount: true, canRequestDemo: true, canAccessMarketing: true,
               canViewInvoices: true, canAccessParts: true, canAccessService: true };
    case 'sales':
      return { ...base, canOrder: true, canViewPricing: true, canRequestDemo: true,
               canAccessMarketing: true, canAccessParts: true };
    case 'parts':
      return { ...base, canOrder: true, canViewPricing: true, canAccessParts: true };
    case 'service':
      return { ...base, canAccessService: true, canAccessParts: true };
    case 'accounts':
      return { ...base, canViewPricing: true, canViewAllOrders: true, canViewInvoices: true };
    default:
      return base;
  }
}

// ─── Helpers ─────────────────────────────────────────────────
export function tierLabel(tier: DealerPortalTier): string {
  const labels: Record<DealerPortalTier, string> = {
    standard: 'Authorised Dealer',
    silver: 'Silver Partner',
    gold: 'Gold Partner',
    platinum: 'Platinum Partner',
  };
  return labels[tier] || 'Dealer';
}

export function statusLabel(status: ApplicationStatus): string {
  const labels: Record<ApplicationStatus, string> = {
    pending: 'Pending Review',
    under_review: 'Under Review',
    more_info_required: 'More Information Required',
    approved: 'Approved',
    rejected: 'Rejected',
  };
  return labels[status] || status;
}
