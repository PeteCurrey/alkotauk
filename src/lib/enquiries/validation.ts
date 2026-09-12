/**
 * Alkota UK — Canonical Enquiry Submission Validation
 * Phase 7.1
 *
 * Server-side validation helpers for the /api/enquiries endpoint.
 * Provides typed validation, sanitisation, and eligibility checks.
 * Nothing in this module trusts client-supplied data.
 */

import { Product } from '@/lib/products';
import { EnquirySource } from '@/lib/enquiries/schema';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const MAX_PAYLOAD_BYTES = 32_768; // 32 KB
export const MAX_MACHINE_IDENTIFIERS = 10;
export const MAX_SUBJECT_LENGTH = 200;
export const MAX_MESSAGE_LENGTH = 5_000;
export const MAX_NAME_LENGTH = 120;
export const MAX_EMAIL_LENGTH = 254; // RFC 5321

export const ALLOWED_SOURCES: ReadonlySet<EnquirySource> = new Set<EnquirySource>([
  'MACHINE_DETAIL',
  'MACHINE_SELECTOR',
  'MACHINE_COMPARISON',
  'MACHINE_CATALOGUE',
  'PARTS',
  'ATTACHMENTS',
  'CHEMICALS',
  'DEALER',
  'GENERAL',
]);

// ---------------------------------------------------------------------------
// Typed error codes
// ---------------------------------------------------------------------------

export type EnquiryErrorCode =
  | 'VALIDATION_ERROR'
  | 'MACHINE_NOT_FOUND'
  | 'MACHINE_UNAVAILABLE'
  | 'INVALID_REQUIREMENTS'
  | 'SELECTOR_ERROR'
  | 'COMPARISON_ERROR'
  | 'RATE_LIMITED'
  | 'SERVER_ERROR';

/**
 * Structured error thrown by validation helpers and caught by the route handler.
 * Carries a typed code and a safe, public-facing message.
 * Never include internal DB detail or stack traces in `message`.
 */
export class EnquiryError extends Error {
  readonly code: EnquiryErrorCode;
  readonly httpStatus: number;
  readonly details?: string[];

  constructor(code: EnquiryErrorCode, message: string, details?: string[], httpStatus?: number) {
    super(message);
    this.name = 'EnquiryError';
    this.code = code;
    this.details = details;
    this.httpStatus = httpStatus ?? httpStatusFor(code);
  }
}

function httpStatusFor(code: EnquiryErrorCode): number {
  switch (code) {
    case 'VALIDATION_ERROR':
    case 'MACHINE_NOT_FOUND':
    case 'MACHINE_UNAVAILABLE':
    case 'INVALID_REQUIREMENTS':
    case 'COMPARISON_ERROR':
      return 400;
    case 'RATE_LIMITED':
      return 429;
    case 'SELECTOR_ERROR':
    case 'SERVER_ERROR':
      return 500;
  }
}

// ---------------------------------------------------------------------------
// Public error response shape
// ---------------------------------------------------------------------------

export interface EnquiryErrorResponse {
  success: false;
  code: EnquiryErrorCode;
  message: string;
  details?: string[];
}

export function buildErrorResponse(err: EnquiryError): EnquiryErrorResponse {
  return {
    success: false,
    code: err.code,
    message: err.message,
    ...(err.details && err.details.length > 0 ? { details: err.details } : {}),
  };
}

// ---------------------------------------------------------------------------
// Field validators
// ---------------------------------------------------------------------------

/**
 * Basic RFC-5322-ish email format check.
 * Does not do SMTP verification — just structure.
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_EMAIL_LENGTH) return false;
  // Must have one @ with content on both sides, a dot after the @
  const atIdx = trimmed.lastIndexOf('@');
  if (atIdx < 1) return false;
  const local = trimmed.slice(0, atIdx);
  const domain = trimmed.slice(atIdx + 1);
  if (local.length === 0 || domain.length < 3) return false;
  if (!domain.includes('.')) return false;
  // Reject control characters and spaces
  if (/[\x00-\x1F\s]/.test(trimmed)) return false;
  return true;
}

/**
 * Strip ASCII control characters from subject and enforce max length.
 */
export function sanitiseSubject(raw: string | undefined | null): string | null {
  if (!raw || typeof raw !== 'string') return null;
  const cleaned = raw.replace(/[\x00-\x1F\x7F]/g, '').trim();
  if (cleaned.length === 0) return null;
  return cleaned.slice(0, MAX_SUBJECT_LENGTH);
}

/**
 * Sanitise free-text message — strip null bytes, trim, enforce max length.
 */
export function sanitiseMessage(raw: string | undefined | null): string | null {
  if (!raw || typeof raw !== 'string') return null;
  const cleaned = raw.replace(/\x00/g, '').trim();
  if (cleaned.length === 0) return null;
  return cleaned.slice(0, MAX_MESSAGE_LENGTH);
}

/**
 * Normalise and validate name field.
 */
export function sanitiseName(raw: string | undefined | null): string | null {
  if (!raw || typeof raw !== 'string') return null;
  const cleaned = raw.replace(/[\x00-\x1F\x7F]/g, '').trim();
  if (cleaned.length === 0) return null;
  return cleaned.slice(0, MAX_NAME_LENGTH);
}

/**
 * Check whether a product is eligible for a commercial enquiry.
 * The server must enforce this — the client cannot be trusted to only submit published machines.
 */
export function isEligibleMachine(product: Product): boolean {
  return product.status === 'published' && product.active === true;
}

// ---------------------------------------------------------------------------
// Payload validation
// ---------------------------------------------------------------------------

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate the raw request body for the /api/enquiries endpoint.
 * Returns a ValidationResult describing all detected problems.
 * Does NOT throw — callers decide how to surface errors.
 */
export function validateEnquiryPayload(body: unknown): ValidationResult {
  const errors: string[] = [];

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { valid: false, errors: ['Request body must be a JSON object.'] };
  }

  const b = body as Record<string, unknown>;

  // Customer block
  const customer = b.customer;
  if (!customer || typeof customer !== 'object' || Array.isArray(customer)) {
    errors.push('customer object is required.');
  } else {
    const c = customer as Record<string, unknown>;

    const name = sanitiseName(c.name as string);
    if (!name) {
      errors.push('customer.name is required and must be a non-empty string.');
    }

    const email = c.email;
    if (!email || typeof email !== 'string' || !isValidEmail(email as string)) {
      errors.push('customer.email is required and must be a valid email address.');
    }

    if (c.preferredContactMethod !== undefined) {
      if (!['email', 'phone', 'either'].includes(c.preferredContactMethod as string)) {
        errors.push('customer.preferredContactMethod must be "email", "phone", or "either".');
      }
    }
  }

  // Source
  if (!b.source || typeof b.source !== 'string') {
    errors.push('source is required.');
  } else if (!ALLOWED_SOURCES.has(b.source as EnquirySource)) {
    errors.push(`source "${b.source}" is not a recognised enquiry source.`);
  }

  // Machines
  if (b.machines !== undefined) {
    if (!Array.isArray(b.machines)) {
      errors.push('machines must be an array.');
    } else if (b.machines.length > MAX_MACHINE_IDENTIFIERS) {
      errors.push(
        `machines array exceeds the maximum of ${MAX_MACHINE_IDENTIFIERS} identifiers (received ${b.machines.length}).`
      );
    } else {
      for (let i = 0; i < b.machines.length; i++) {
        const m = b.machines[i];
        if (!m || typeof m !== 'object' || Array.isArray(m)) {
          errors.push(`machines[${i}] must be an object.`);
          continue;
        }
        const mc = m as Record<string, unknown>;
        if (!mc.identifier || typeof mc.identifier !== 'string' || !mc.identifier.trim()) {
          errors.push(`machines[${i}].identifier is required and must be a non-empty string.`);
        }
      }
    }
  }

  // Comparison context: must have at least 2 machines
  if (b.source === 'MACHINE_COMPARISON') {
    const machineArr = Array.isArray(b.machines) ? b.machines : [];
    if (machineArr.length < 2) {
      errors.push(
        'MACHINE_COMPARISON source requires at least 2 machine identifiers.'
      );
    }
  }

  return { valid: errors.length === 0, errors };
}

// ---------------------------------------------------------------------------
// In-memory rate limiter
// ---------------------------------------------------------------------------
// NOTE: This is a per-process, per-instance rate limiter. On serverless
// deployments (e.g. Vercel), each function instance has independent state.
// This is appropriate for Phase 7.1 (satisfies the audit MEDIUM finding)
// but should be replaced with a persistent store (e.g. Vercel KV) for
// multi-instance production-grade abuse prevention.

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

/** Clean up stale entries older than 2 windows to avoid unbounded growth. */
function pruneRateLimitStore(): void {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS * 2;
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.windowStart < cutoff) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Check rate limit for a given key (typically client IP).
 * Returns true if the request is allowed, false if rate limited.
 */
export function checkRateLimit(key: string): boolean {
  const now = Date.now();

  // Prune occasionally (1-in-50 chance to avoid doing it every request)
  if (Math.random() < 0.02) pruneRateLimitStore();

  const existing = rateLimitStore.get(key);

  if (!existing || now - existing.windowStart > RATE_LIMIT_WINDOW_MS) {
    // New window
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return true;
  }

  existing.count += 1;
  return existing.count <= RATE_LIMIT_MAX_REQUESTS;
}

/**
 * Extract a best-effort client IP from Next.js request headers.
 * Falls back to a constant key to avoid undefined behaviour.
 */
export function getClientKey(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}
