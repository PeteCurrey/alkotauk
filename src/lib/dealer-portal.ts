import { getSupabaseAdmin } from './supabase/server';
import type {
  DealerOrg,
  DealerUser,
  DealerAnnouncement,
  DealerResource,
  DealerApplication,
  DealerAuditLog,
  DealerPortalTier,
} from './types/dealer-portal';

// ─── Dealer Org ──────────────────────────────────────────────

/** Look up a dealer organisation by the email of one of its active users */
export async function getDealerByUserEmail(
  email: string
): Promise<{ dealer: DealerOrg | null; user: DealerUser | null }> {
  const db = getSupabaseAdmin();
  const { data } = await db
    .from('dealer_users')
    .select('*, dealer:dealers(*)')
    .eq('email', email.toLowerCase())
    .eq('active', true)
    .maybeSingle();

  if (!data) return { dealer: null, user: null };
  const { dealer, ...user } = data as any;
  return { dealer: dealer as DealerOrg, user: user as DealerUser };
}

/** Get dealer org by ID */
export async function getDealerOrg(dealerId: string): Promise<DealerOrg | null> {
  const db = getSupabaseAdmin();
  const { data } = await db
    .from('dealers')
    .select('*')
    .eq('id', dealerId)
    .maybeSingle();
  return (data as DealerOrg) ?? null;
}

/** Get dealer user by ID */
export async function getDealerUser(userId: string): Promise<DealerUser | null> {
  const db = getSupabaseAdmin();
  const { data } = await db
    .from('dealer_users')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  return (data as DealerUser) ?? null;
}

/** List all users in a dealer org */
export async function getDealerUsers(dealerId: string): Promise<DealerUser[]> {
  const db = getSupabaseAdmin();
  const { data } = await db
    .from('dealer_users')
    .select('*')
    .eq('dealer_id', dealerId)
    .order('created_at');
  return (data as DealerUser[]) ?? [];
}

// ─── Announcements ───────────────────────────────────────────

/** Get active published announcements visible to this tier */
export async function getDealerAnnouncements(
  tier: DealerPortalTier,
  limit = 5
): Promise<DealerAnnouncement[]> {
  const db = getSupabaseAdmin();
  const now = new Date().toISOString();
  const { data } = await db
    .from('dealer_announcements')
    .select('*')
    .eq('published', true)
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .contains('audience_tiers', [tier])
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data as DealerAnnouncement[]) ?? [];
}

// ─── Resources ───────────────────────────────────────────────

const TIER_ACCESS_LEVELS: Record<DealerPortalTier, string[]> = {
  standard: ['public', 'dealer'],
  silver:   ['public', 'dealer', 'tier_silver'],
  gold:     ['public', 'dealer', 'tier_silver', 'tier_gold'],
  platinum: ['public', 'dealer', 'tier_silver', 'tier_gold', 'tier_platinum'],
};

/** Get dealer resources with tier-based access control */
export async function getDealerResources(opts: {
  tier: DealerPortalTier;
  dealerId?: string;
  category?: string;
  document_type?: string;
  search?: string;
  limit?: number;
}): Promise<DealerResource[]> {
  const db = getSupabaseAdmin();
  const allowed = TIER_ACCESS_LEVELS[opts.tier] ?? TIER_ACCESS_LEVELS.standard;

  let query = db
    .from('dealer_resources')
    .select('*')
    .eq('active', true)
    .in('access_level', allowed);

  if (opts.category)       query = query.eq('category', opts.category);
  if (opts.document_type)  query = query.eq('document_type', opts.document_type);
  if (opts.search)         query = query.ilike('title', `%${opts.search}%`);

  query = query
    .order('sort_order')
    .order('created_at', { ascending: false })
    .limit(opts.limit ?? 50);

  const { data } = await query;
  return (data as DealerResource[]) ?? [];
}

// ─── Orders ──────────────────────────────────────────────────

/** Get dealer orders (tenant-isolated by dealer_id) */
export async function getDealerOrders(dealerId: string, limit = 20) {
  const db = getSupabaseAdmin();
  const { data } = await db
    .from('orders')
    .select('*')
    .eq('dealer_id', dealerId)
    .order('created_at', { ascending: false })
    .limit(limit);
  return data ?? [];
}

/** Count open orders for a dealer */
export async function getOpenOrderCount(dealerId: string): Promise<number> {
  const db = getSupabaseAdmin();
  const { count } = await db
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .eq('dealer_id', dealerId)
    .in('status', ['new', 'pending', 'hold']);
  return count ?? 0;
}

// ─── Notifications ───────────────────────────────────────────

/** Get unread notification count for a dealer user */
export async function getUnreadNotificationCount(dealerUserId: string): Promise<number> {
  const db = getSupabaseAdmin();
  const { count } = await db
    .from('dealer_notifications')
    .select('id', { count: 'exact', head: true })
    .eq('dealer_user_id', dealerUserId)
    .eq('read', false);
  return count ?? 0;
}

// ─── Training ────────────────────────────────────────────────

/** Get training modules available to a tier */
export async function getDealerTraining(tier: DealerPortalTier, limit = 20) {
  const db = getSupabaseAdmin();
  const tierOrder: DealerPortalTier[] = ['standard', 'silver', 'gold', 'platinum'];
  const maxIdx = tierOrder.indexOf(tier);
  const accessible = tierOrder.slice(0, maxIdx + 1);

  const { data } = await db
    .from('dealer_training')
    .select('*')
    .eq('active', true)
    .in('access_tier', accessible)
    .order('sort_order')
    .limit(limit);
  return data ?? [];
}

/** Get training completion stats for a dealer user */
export async function getTrainingProgress(dealerUserId: string) {
  const db = getSupabaseAdmin();
  const { data } = await db
    .from('dealer_training_progress')
    .select('*')
    .eq('dealer_user_id', dealerUserId);
  const completed = (data ?? []).filter((p: any) => p.status === 'completed').length;
  const inProgress = (data ?? []).filter((p: any) => p.status === 'in_progress').length;
  return { completed, inProgress, total: (data ?? []).length };
}

// ─── Applications ────────────────────────────────────────────

/** Get a single application by ID */
export async function getDealerApplication(id: string): Promise<DealerApplication | null> {
  const db = getSupabaseAdmin();
  const { data } = await db
    .from('dealer_applications')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  return (data as DealerApplication) ?? null;
}

/** List applications with optional status filter */
export async function listDealerApplications(opts?: {
  status?: string;
  limit?: number;
}): Promise<DealerApplication[]> {
  const db = getSupabaseAdmin();
  let query = db
    .from('dealer_applications')
    .select('*')
    .order('created_at', { ascending: false });
  if (opts?.status) query = query.eq('status', opts.status);
  if (opts?.limit)  query = query.limit(opts.limit);
  const { data } = await query;
  return (data as DealerApplication[]) ?? [];
}

// ─── Audit Log ───────────────────────────────────────────────

/** Write an immutable audit log entry */
export async function logDealerAudit(opts: {
  action: string;
  actorId: string;
  actorType: DealerAuditLog['actor_type'];
  entityType: string;
  entityId?: string;
  dealerId?: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const db = getSupabaseAdmin();
  await db.from('dealer_audit_log').insert({
    action:      opts.action,
    actor_id:    opts.actorId,
    actor_type:  opts.actorType,
    entity_type: opts.entityType,
    entity_id:   opts.entityId ?? null,
    dealer_id:   opts.dealerId ?? null,
    metadata:    opts.metadata ?? {},
  });
}

// ─── Reference Generators ────────────────────────────────────

export function generateTicketNumber(): string {
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `TKT-${new Date().getFullYear()}-${rand}`;
}

export function generateDemoRequestNumber(): string {
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `DEMO-${new Date().getFullYear()}-${rand}`;
}

export function generateApplicationReference(): string {
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `APP-${new Date().getFullYear()}-${rand}`;
}

// ─── Pricing ─────────────────────────────────────────────────

/** Resolve dealer price for a part (specific dealer override → tier rule → null) */
export async function getDealerPartPrice(
  partId: string,
  dealerId: string,
  tier: DealerPortalTier
): Promise<{ price: number | null; discount_pct: number | null }> {
  const db = getSupabaseAdmin();
  const now = new Date().toISOString();

  // 1. Specific dealer override
  const { data: specific } = await db
    .from('dealer_pricing_rules')
    .select('discount_pct, price_override')
    .eq('part_id', partId)
    .eq('dealer_id', dealerId)
    .eq('active', true)
    .or(`valid_from.is.null,valid_from.lte.${now}`)
    .or(`valid_to.is.null,valid_to.gte.${now}`)
    .maybeSingle();

  if (specific) {
    return { price: specific.price_override ?? null, discount_pct: specific.discount_pct ?? null };
  }

  // 2. Tier rule
  const { data: tierRule } = await db
    .from('dealer_pricing_rules')
    .select('discount_pct, price_override')
    .eq('part_id', partId)
    .eq('portal_tier', tier)
    .eq('active', true)
    .or(`valid_from.is.null,valid_from.lte.${now}`)
    .or(`valid_to.is.null,valid_to.gte.${now}`)
    .maybeSingle();

  if (tierRule) {
    return { price: tierRule.price_override ?? null, discount_pct: tierRule.discount_pct ?? null };
  }

  return { price: null, discount_pct: null };
}
