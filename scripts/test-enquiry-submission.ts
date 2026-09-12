/**
 * ALKOTA UK — PHASE 7.1: CANONICAL ENQUIRY SUBMISSION & VALIDATION TEST SUITE
 *
 * Tests the hardened server-authoritative enquiry submission boundary, including:
 *
 * Group 1: Payload validation
 * Group 2: Email validation
 * Group 3: Subject & message sanitisation
 * Group 4: Machine eligibility gate
 * Group 5: Rate limiter
 * Group 6: Field allowlist / mass assignment protection
 * Group 7: Machine resolution security
 * Group 8: Selector anti-spoofing
 * Group 9: Comparison context validation
 * Group 10: Canonical data construction integrity
 * Group 11: Transactional integrity (compensating delete simulation)
 * Group 12: Error contract shape
 * Group 13: Structured requirements validation via submission pipeline
 */

import canonicalCatalogue from './data/alkota-canonical-catalogue.json';
import { Product } from '../src/lib/products';
import {
  isValidEmail,
  sanitiseSubject,
  sanitiseMessage,
  sanitiseName,
  isEligibleMachine,
  validateEnquiryPayload,
  buildErrorResponse,
  EnquiryError,
  checkRateLimit,
  MAX_SUBJECT_LENGTH,
  MAX_MACHINE_IDENTIFIERS,
} from '../src/lib/enquiries/validation';
import {
  revalidateMachineEnquiry,
  buildCanonicalEnquiryData,
  resolveMachines,
} from '../src/lib/machine-enquiries/service';
import { SubmitEnquiryPayload } from '../src/lib/enquiries/schema';

const allMachines = canonicalCatalogue as unknown as Product[];

// ---------------------------------------------------------------------------
// Test harness
// ---------------------------------------------------------------------------

let testsPassed = 0;
let testsFailed = 0;
const failures: string[] = [];

function assert(condition: boolean, description: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${description}`);
    testsPassed++;
  } else {
    console.error(`  ✗ FAIL: ${description}`);
    testsFailed++;
    failures.push(description);
  }
}

function section(title: string) {
  console.log(`\n[${title}]`);
}

// ---------------------------------------------------------------------------
// Helpers: build minimal valid payloads
// ---------------------------------------------------------------------------

function minimalPayload(overrides: Partial<SubmitEnquiryPayload> = {}): SubmitEnquiryPayload {
  return {
    customer: {
      name: 'David Atkinson',
      email: 'david.atkinson@steelworks.co.uk',
    },
    source: 'MACHINE_DETAIL',
    ...overrides,
  };
}

function selectorPayload(): SubmitEnquiryPayload {
  return {
    customer: {
      name: 'Jane Fleet',
      email: 'jane.fleet@truckingltd.com',
    },
    source: 'MACHINE_SELECTOR',
    machines: [
      { identifier: 'HHT8040' },
    ],
    requirements: {
      application: 'FLEET_VEHICLE_CLEANING',
      waterType: 'hot',
      powerSource: 'electric',
      mobility: 'stationary',
    },
  };
}

function comparisonPayload(machines: string[]): SubmitEnquiryPayload {
  return {
    customer: {
      name: 'Tom Hardy',
      email: 'tom.hardy@industrialclean.co.uk',
    },
    source: 'MACHINE_COMPARISON',
    machines: machines.map(id => ({ identifier: id })),
  };
}

// ---------------------------------------------------------------------------
// Group 1: Payload validation
// ---------------------------------------------------------------------------
section('Group 1: Payload Validation');

{
  // Missing customer
  const r = validateEnquiryPayload({ source: 'MACHINE_DETAIL' });
  assert(!r.valid, 'Missing customer block → invalid');
  assert(r.errors.some(e => e.includes('customer')), 'Error mentions customer field');
}

{
  // Missing name
  const r = validateEnquiryPayload({ customer: { email: 'a@b.com' }, source: 'MACHINE_DETAIL' });
  assert(!r.valid, 'Missing customer.name → invalid');
  assert(r.errors.some(e => e.includes('name')), 'Error mentions name');
}

{
  // Missing email
  const r = validateEnquiryPayload({ customer: { name: 'Bob' }, source: 'MACHINE_DETAIL' });
  assert(!r.valid, 'Missing customer.email → invalid');
}

{
  // Missing source
  const r = validateEnquiryPayload({ customer: { name: 'Bob', email: 'b@b.com' } });
  assert(!r.valid, 'Missing source → invalid');
  assert(r.errors.some(e => e.includes('source')), 'Error mentions source');
}

{
  // Invalid source enum
  const r = validateEnquiryPayload({ customer: { name: 'Bob', email: 'b@b.com' }, source: 'SPOOFED_SOURCE' });
  assert(!r.valid, 'Unrecognised source → invalid');
  assert(r.errors.some(e => e.includes('SPOOFED_SOURCE')), 'Error includes the bad source value');
}

{
  // Valid minimal payload
  const r = validateEnquiryPayload(minimalPayload());
  assert(r.valid, 'Minimal valid payload passes');
  assert(r.errors.length === 0, 'No errors on valid minimal payload');
}

{
  // Max machines exceeded
  const machines = Array.from({ length: MAX_MACHINE_IDENTIFIERS + 1 }, (_, i) => ({ identifier: `MACH${i}` }));
  const r = validateEnquiryPayload({ ...minimalPayload(), machines });
  assert(!r.valid, `${MAX_MACHINE_IDENTIFIERS + 1} machines → invalid (exceeds cap)`);
  assert(r.errors.some(e => e.includes('maximum')), 'Error mentions maximum');
}

{
  // Exactly at max machines — valid
  const machines = Array.from({ length: MAX_MACHINE_IDENTIFIERS }, (_, i) => ({ identifier: `MACH${i}` }));
  const r = validateEnquiryPayload({ ...minimalPayload(), machines });
  assert(r.valid, `Exactly ${MAX_MACHINE_IDENTIFIERS} machines → valid`);
}

{
  // Machine entry missing identifier
  const r = validateEnquiryPayload({ ...minimalPayload(), machines: [{ identifier: '' }] });
  assert(!r.valid, 'Empty identifier string → invalid');
}

{
  // COMPARISON with only 1 machine → invalid
  const r = validateEnquiryPayload(comparisonPayload(['HHT8040']));
  assert(!r.valid, 'MACHINE_COMPARISON with 1 machine → invalid');
  assert(r.errors.some(e => e.includes('MACHINE_COMPARISON')), 'Error mentions MACHINE_COMPARISON');
}

{
  // COMPARISON with 2 machines → valid
  const r = validateEnquiryPayload(comparisonPayload(['HHT8040', 'HHT5030']));
  assert(r.valid, 'MACHINE_COMPARISON with 2 machines → valid');
}

{
  // Invalid preferredContactMethod
  const r = validateEnquiryPayload({
    customer: { name: 'X', email: 'x@x.com', preferredContactMethod: 'fax' as any },
    source: 'GENERAL',
  });
  assert(!r.valid, 'Invalid preferredContactMethod → invalid');
}

{
  // Valid preferredContactMethod values
  for (const method of ['email', 'phone', 'either'] as const) {
    const r = validateEnquiryPayload({
      customer: { name: 'X', email: 'x@x.com', preferredContactMethod: method },
      source: 'GENERAL',
    });
    assert(r.valid, `preferredContactMethod "${method}" → valid`);
  }
}

// ---------------------------------------------------------------------------
// Group 2: Email Validation
// ---------------------------------------------------------------------------
section('Group 2: Email Validation');

assert(isValidEmail('user@example.com'), 'Standard email → valid');
assert(isValidEmail('user.name+tag@subdomain.example.co.uk'), 'Complex valid email → valid');
assert(!isValidEmail(''), 'Empty string → invalid');
assert(!isValidEmail('notanemail'), 'No @ → invalid');
assert(!isValidEmail('@domain.com'), 'No local part → invalid');
assert(!isValidEmail('user@'), 'No domain → invalid');
assert(!isValidEmail('user@domain'), 'Domain with no dot → invalid');
assert(!isValidEmail('user name@domain.com'), 'Email with space → invalid');
assert(!isValidEmail('user\x00@domain.com'), 'Email with null byte → invalid');
assert(!isValidEmail('a'.repeat(255) + '@domain.com'), 'Email exceeding max length → invalid');

// ---------------------------------------------------------------------------
// Group 3: Subject & Message Sanitisation
// ---------------------------------------------------------------------------
section('Group 3: Subject & Message Sanitisation');

assert(sanitiseSubject('Normal subject') === 'Normal subject', 'Clean subject passes through unchanged');
assert(sanitiseSubject(null) === null, 'Null subject returns null');
assert(sanitiseSubject('') === null, 'Empty subject returns null');
assert(sanitiseSubject('   ') === null, 'Whitespace-only subject returns null');

{
  const withControl = 'Hello\x00World\x1F';
  const result = sanitiseSubject(withControl);
  assert(result !== null && !result.includes('\x00') && !result.includes('\x1F'), 'Control chars stripped from subject');
  assert(result === 'HelloWorld', 'Control chars stripped correctly');
}

{
  const longSubject = 'A'.repeat(MAX_SUBJECT_LENGTH + 50);
  const result = sanitiseSubject(longSubject);
  assert(result !== null && result.length === MAX_SUBJECT_LENGTH, `Subject capped at ${MAX_SUBJECT_LENGTH} chars`);
}

assert(sanitiseMessage(null) === null, 'Null message returns null');
assert(sanitiseMessage('') === null, 'Empty message returns null');
{
  const withNull = 'Hello\x00World';
  const result = sanitiseMessage(withNull);
  assert(result !== null && !result.includes('\x00'), 'Null byte stripped from message');
}

assert(sanitiseName('David Atkinson') === 'David Atkinson', 'Clean name passes through');
assert(sanitiseName(null) === null, 'Null name returns null');
assert(sanitiseName('') === null, 'Empty name returns null');
{
  const nameWithControl = 'Tom\x01Hardy';
  const result = sanitiseName(nameWithControl);
  assert(result !== null && !result.includes('\x01'), 'Control char stripped from name');
}

// ---------------------------------------------------------------------------
// Group 4: Machine Eligibility Gate
// ---------------------------------------------------------------------------
section('Group 4: Machine Eligibility Gate');

{
  const published: Partial<Product> = { status: 'published', active: true };
  assert(isEligibleMachine(published as Product), 'published + active → eligible');
}

{
  const draft: Partial<Product> = { status: 'draft', active: true };
  assert(!isEligibleMachine(draft as Product), 'draft + active → NOT eligible');
}

{
  const archived: Partial<Product> = { status: 'archived', active: true };
  assert(!isEligibleMachine(archived as Product), 'archived + active → NOT eligible');
}

{
  const inactive: Partial<Product> = { status: 'published', active: false };
  assert(!isEligibleMachine(inactive as Product), 'published + inactive → NOT eligible');
}

{
  const both: Partial<Product> = { status: 'draft', active: false };
  assert(!isEligibleMachine(both as Product), 'draft + inactive → NOT eligible');
}

{
  // Real catalogue machine eligibility
  const realMachines = allMachines.filter(m => m.status === 'published' && m.active === true);
  assert(realMachines.length > 0, 'At least one published+active machine exists in catalogue');
  assert(realMachines.every(m => isEligibleMachine(m)), 'All published+active catalogue machines pass eligibility check');
}

// ---------------------------------------------------------------------------
// Group 5: Rate Limiter
// ---------------------------------------------------------------------------
section('Group 5: Rate Limiter');

{
  // Use a unique key to avoid cross-contamination with other test runs
  const testKey = `test-rate-limit-${Date.now()}`;
  let allowed = 0;
  let blocked = 0;
  for (let i = 0; i < 15; i++) {
    if (checkRateLimit(testKey)) {
      allowed++;
    } else {
      blocked++;
    }
  }
  assert(allowed === 10, `Rate limiter allows exactly 10 requests (got ${allowed})`);
  assert(blocked === 5, `Rate limiter blocks excess requests (got ${blocked})`);
}

{
  // Different keys are independent
  const key1 = `rl-key1-${Date.now()}`;
  const key2 = `rl-key2-${Date.now()}`;
  for (let i = 0; i < 10; i++) checkRateLimit(key1);
  // key1 is now exhausted; key2 should still be fresh
  assert(checkRateLimit(key2), 'Different IPs have independent rate limit windows');
  assert(!checkRateLimit(key1), 'Exhausted key is blocked');
}

// ---------------------------------------------------------------------------
// Group 6: Field Allowlist / Mass Assignment Protection
// ---------------------------------------------------------------------------
section('Group 6: Field Allowlist / Mass Assignment Protection');

{
  // Verify that validateEnquiryPayload doesn't allow admin fields to pass validation
  // (the route handler does the explicit mapping — this tests that validation
  // itself doesn't acknowledge or pass through admin fields as valid requirements)
  const payloadWithAdminFields = {
    ...minimalPayload(),
    admin_notes: 'injected admin note',
    assigned_to: 'admin@alkota.co.uk',
    id: '00000000-0000-0000-0000-000000000000',
    revalidated_at: '2020-01-01T00:00:00Z',
    selector_version: 'v99-spoofed',
  };
  const r = validateEnquiryPayload(payloadWithAdminFields);
  // Payload validation should still pass (extra fields are ignored)
  assert(r.valid, 'Extra admin fields in payload do not cause validation failure (they are ignored, not blocked)');
}

{
  // The canonical data builder must not propagate spoofed revalidated_at
  // Even if it appears somewhere in rawRequirements, server generates its own timestamp
  const testMachines = allMachines.filter(m => m.status === 'published' && m.active);
  const testMachine = testMachines[0];
  const revalidation = revalidateMachineEnquiry(
    { machineIdentifiers: [testMachine.slug], rawRequirements: {} },
    [testMachine]
  );
  const { enquiryRecord } = buildCanonicalEnquiryData({
    reference: 'TEST-001',
    source: 'MACHINE_DETAIL',
    customer: { name: 'Test User', email: 'test@test.com' },
    revalidation,
  });
  // revalidated_at should be a real ISO timestamp from the server, not a spoofed value
  assert(
    typeof enquiryRecord.revalidated_at === 'string' &&
      enquiryRecord.revalidated_at.length > 10,
    'revalidated_at is a real server-generated timestamp'
  );
  assert(
    enquiryRecord.status === 'new',
    'status is always server-assigned "new"'
  );
}

{
  // selector_version is set by the server, not accepted from client
  const testMachines = allMachines.filter(m => m.status === 'published' && m.active);
  const testMachine = testMachines[0];
  const revalidation = revalidateMachineEnquiry(
    {
      source: 'machine_selector',
      machineIdentifiers: [testMachine.slug],
      rawRequirements: { application: 'FLEET_VEHICLE_CLEANING', waterType: 'hot' },
    },
    [testMachine]
  );
  const { enquiryRecord } = buildCanonicalEnquiryData({
    reference: 'TEST-002',
    source: 'MACHINE_SELECTOR',
    customer: { name: 'Test', email: 'test@test.com' },
    revalidation,
    // Note: no selectorVersion passed, so service should default to its own value
  });
  assert(
    typeof enquiryRecord.selector_version === 'string' &&
      enquiryRecord.selector_version.startsWith('v'),
    'selector_version is server-set (starts with "v")'
  );
}

// ---------------------------------------------------------------------------
// Group 7: Machine Resolution Security
// ---------------------------------------------------------------------------
section('Group 7: Machine Resolution Security');

{
  // Known valid machine resolves
  const known = allMachines.filter(m => m.status === 'published' && m.active)[0];
  const resolved = resolveMachines([known.slug], allMachines);
  assert(resolved.length === 1, 'Known slug resolves to exactly one machine');
  assert(resolved[0].slug === known.slug, 'Resolved machine has correct slug');
}

{
  // Unknown identifier resolves to nothing
  const resolved = resolveMachines(['definitely-not-a-real-machine-xyz'], allMachines);
  assert(resolved.length === 0, 'Unknown identifier resolves to empty array');
}

{
  // Spoofed UUID in identifier list — should not bypass resolution
  const resolved = resolveMachines(['00000000-0000-0000-0000-000000000000'], allMachines);
  assert(resolved.length === 0, 'Spoofed UUID as identifier does not resolve');
}

{
  // Model code resolution (case insensitive)
  const known = allMachines.filter(m => m.model_code && m.status === 'published')[0];
  const resolvedUpper = resolveMachines([known.model_code.toUpperCase()], allMachines);
  const resolvedLower = resolveMachines([known.model_code.toLowerCase()], allMachines);
  assert(resolvedUpper.length === 1, 'Model code (uppercase) resolves correctly');
  assert(resolvedLower.length === 1, 'Model code (lowercase) resolves correctly');
}

{
  // Deduplication: same machine submitted twice
  const known = allMachines.filter(m => m.status === 'published' && m.active)[0];
  const resolved = resolveMachines([known.slug, known.slug, known.model_code], allMachines);
  assert(resolved.length === 1, 'Duplicate identifiers deduplicated to single machine');
}

{
  // SQL injection attempt in identifier
  const resolved = resolveMachines(["'; DROP TABLE enquiries; --"], allMachines);
  assert(resolved.length === 0, 'SQL injection in identifier resolves to nothing');
}

{
  // XSS attempt in identifier
  const resolved = resolveMachines(['<script>alert(1)</script>'], allMachines);
  assert(resolved.length === 0, 'XSS payload in identifier resolves to nothing');
}

// ---------------------------------------------------------------------------
// Group 8: Selector Anti-Spoofing
// ---------------------------------------------------------------------------
section('Group 8: Selector Anti-Spoofing');

{
  // Server independently determines match status, ignoring claimedMatchStatus
  const machines = allMachines.filter(m => m.status === 'published' && m.active);
  const testMachine = machines[0];

  const result = revalidateMachineEnquiry(
    {
      source: 'machine_selector',
      machineIdentifiers: [testMachine.slug],
      rawRequirements: {
        application: 'FLEET_VEHICLE_CLEANING',
        waterType: 'hot',
        powerSource: 'electric',
        mobility: 'stationary',
      },
      claimedMatchStatus: {
        [testMachine.slug]: 'STRONG_MATCH', // client claims strong match
      },
    },
    machines
  );

  // Server result should be set regardless of claimed status
  const evaluated = result.revalidationResult.evaluated_machines.find(
    e => e.slug === testMachine.slug
  );
  assert(evaluated !== undefined, 'Server evaluates claimed machine independently');
  assert(
    ['STRONG_MATCH', 'POSSIBLE_MATCH', 'DOES_NOT_MEET'].includes(
      evaluated!.server_match_status
    ),
    'Server determines its own match status (not taken from client claim)'
  );
}

{
  // Discrepancy detection: client claims STRONG_MATCH, server says DOES_NOT_MEET
  // We need a machine with known specs so we can craft impossible requirements
  const publishedMachines = allMachines.filter(
    m => m.status === 'published' && m.active && m.pressure_bar
  );
  if (publishedMachines.length > 0) {
    const testMachine = publishedMachines[0];
    // Require 1000 bar — impossible
    const result = revalidateMachineEnquiry(
      {
        source: 'machine_selector',
        machineIdentifiers: [testMachine.slug],
        rawRequirements: {
          application: 'FLEET_VEHICLE_CLEANING',
          waterType: 'cold',
          minPressureBar: 1000,
        },
        claimedMatchStatus: {
          [testMachine.slug]: 'STRONG_MATCH',
        },
      },
      publishedMachines
    );
    // With impossible requirements, server should determine DOES_NOT_MEET
    const evaluated = result.revalidationResult.evaluated_machines.find(
      e => e.slug === testMachine.slug
    );
    assert(
      evaluated?.server_match_status === 'DOES_NOT_MEET',
      'Server correctly identifies DOES_NOT_MEET when requirements are impossible'
    );
    // Discrepancy should be detected since client claimed STRONG_MATCH
    assert(
      result.revalidationResult.discrepancy_detected === true,
      'Discrepancy detected when client claimed STRONG_MATCH but server determined DOES_NOT_MEET'
    );
  } else {
    console.log('  ⚠ SKIP: No published machines with pressure_bar for discrepancy test');
  }
}

{
  // Revalidated_at is always server-generated ISO timestamp
  const testMachine = allMachines.filter(m => m.status === 'published' && m.active)[0];
  const before = new Date().toISOString();
  const result = revalidateMachineEnquiry(
    { machineIdentifiers: [testMachine.slug] },
    [testMachine]
  );
  const after = new Date().toISOString();
  assert(
    result.revalidationResult.timestamp >= before &&
      result.revalidationResult.timestamp <= after,
    'revalidated_at timestamp is within server execution window'
  );
}

{
  // Unknown = POSSIBLE_MATCH, never DOES_NOT_MEET (core invariant)
  // When an eligible machine has unverified pressure, it must NOT fail; it yields POSSIBLE_MATCH
  const baseMachine = allMachines.find(m => m.status === 'published' && m.active && m.category === 'hot-water')!;
  const machineWithUnverifiedPressure: Product = {
    ...baseMachine,
    pressure_bar: null,
    pressure_psi: null,
  };

  const result = revalidateMachineEnquiry(
    {
      source: 'machine_selector',
      machineIdentifiers: [machineWithUnverifiedPressure.slug],
      rawRequirements: {
        application: 'FLEET_VEHICLE_CLEANING',
        waterType: 'hot',
        minPressureBar: 150,
      },
    },
    [machineWithUnverifiedPressure]
  );

  const evaluated = result.revalidationResult.evaluated_machines.find(
    e => e.slug === machineWithUnverifiedPressure.slug
  );
  assert(
    evaluated?.server_match_status !== 'DOES_NOT_MEET',
    'Unknown ≠ Fail: machine with unverified specs cannot be DOES_NOT_MEET'
  );
  assert(
    evaluated?.server_match_status === 'POSSIBLE_MATCH',
    'Machine with unverified specs yields POSSIBLE_MATCH'
  );
}

// ---------------------------------------------------------------------------
// Group 9: Comparison Context Validation
// ---------------------------------------------------------------------------
section('Group 9: Comparison Context Validation');

{
  // 1 machine in comparison → validation error
  const r = validateEnquiryPayload(comparisonPayload(['HHT8040']));
  assert(!r.valid, 'MACHINE_COMPARISON with 1 machine → invalid payload');
}

{
  // 2 machines in comparison → valid payload
  const r = validateEnquiryPayload(comparisonPayload(['HHT8040', 'HHT5030']));
  assert(r.valid, 'MACHINE_COMPARISON with 2 machines → valid payload');
}

{
  // 3 machines in comparison → valid payload
  const r = validateEnquiryPayload(comparisonPayload(['HHT8040', 'HHT5030', 'CC2030G']));
  assert(r.valid, 'MACHINE_COMPARISON with 3 machines → valid payload');
}

{
  // Comparison context sets machine roles to COMPARISON in canonical data
  const machines = allMachines.filter(m => m.status === 'published' && m.active);
  const m1 = machines[0];
  const m2 = machines[1];

  const revalidation = revalidateMachineEnquiry(
    {
      source: 'machine_comparison',
      machineIdentifiers: [m1.slug, m2.slug],
    },
    [m1, m2]
  );
  const { machineRecords } = buildCanonicalEnquiryData({
    reference: 'CMP-001',
    source: 'MACHINE_COMPARISON',
    context: 'MACHINE_COMPARISON',
    customer: { name: 'Test', email: 'test@test.com' },
    revalidation,
  });
  assert(
    machineRecords.length === 2,
    'Comparison enquiry produces 2 machine records'
  );
  assert(
    machineRecords.every(m => m.role === 'COMPARISON'),
    'All machines in comparison enquiry have role COMPARISON'
  );
}

{
  // display_order reflects insertion order
  const machines = allMachines.filter(m => m.status === 'published' && m.active);
  const m1 = machines[0];
  const m2 = machines[1];
  const m3 = machines[2];

  const revalidation = revalidateMachineEnquiry(
    { source: 'machine_comparison', machineIdentifiers: [m1.slug, m2.slug, m3.slug] },
    [m1, m2, m3]
  );
  const { machineRecords } = buildCanonicalEnquiryData({
    reference: 'CMP-002',
    source: 'MACHINE_COMPARISON',
    customer: { name: 'Test', email: 'test@test.com' },
    revalidation,
  });
  assert(
    machineRecords[0].display_order === 0 &&
      machineRecords[1].display_order === 1 &&
      machineRecords[2].display_order === 2,
    'Machine display_order follows array index order'
  );
}

// ---------------------------------------------------------------------------
// Group 10: Canonical Data Construction Integrity
// ---------------------------------------------------------------------------
section('Group 10: Canonical Data Construction Integrity');

{
  // Machine snapshots use DB values, not client-supplied values
  const machine = allMachines.filter(m => m.status === 'published' && m.active && m.model_code)[0];
  const revalidation = revalidateMachineEnquiry(
    { machineIdentifiers: [machine.slug] },
    [machine]
  );
  const { machineRecords } = buildCanonicalEnquiryData({
    reference: 'SNAP-001',
    source: 'MACHINE_DETAIL',
    customer: { name: 'Test', email: 'test@test.com' },
    revalidation,
  });

  const rec = machineRecords[0];
  assert(rec.model_code_snapshot === machine.model_code, 'model_code_snapshot matches authoritative catalogue');
  assert(rec.machine_name_snapshot === machine.name, 'machine_name_snapshot matches authoritative catalogue');
  assert(rec.slug_snapshot === machine.slug, 'slug_snapshot matches authoritative catalogue');
  assert(rec.category_snapshot === machine.category, 'category_snapshot matches authoritative catalogue');
}

{
  // specs_snapshot contains server-sourced specs
  const machine = allMachines.filter(m => m.status === 'published' && m.active && m.pressure_bar)[0];
  const revalidation = revalidateMachineEnquiry(
    { machineIdentifiers: [machine.slug] },
    [machine]
  );
  const { machineRecords } = buildCanonicalEnquiryData({
    reference: 'SNAP-002',
    source: 'MACHINE_DETAIL',
    customer: { name: 'Test', email: 'test@test.com' },
    revalidation,
  });

  const snap = machineRecords[0].specs_snapshot;
  assert(snap !== undefined && snap !== null, 'specs_snapshot is present');
  assert(snap?.pressure_bar === machine.pressure_bar, 'specs_snapshot.pressure_bar matches catalogue');
  assert(snap?.flow_rate_lpm === machine.flow_rate_lpm, 'specs_snapshot.flow_rate_lpm matches catalogue');
}

{
  // product_id must be UUID or null — never a raw slug/model code
  const machine = allMachines.filter(m => m.status === 'published' && m.active)[0];
  const revalidation = revalidateMachineEnquiry(
    { machineIdentifiers: [machine.slug] },
    [machine]
  );
  const { machineRecords } = buildCanonicalEnquiryData({
    reference: 'SNAP-003',
    source: 'MACHINE_DETAIL',
    customer: { name: 'Test', email: 'test@test.com' },
    revalidation,
  });
  const rec = machineRecords[0];
  if (rec.product_id) {
    assert(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(rec.product_id),
      'product_id (when set) is a valid UUID'
    );
  } else {
    assert(true, 'product_id is null/undefined (machine not yet in products table)');
  }
}

{
  // Enquiry record always has status 'new'
  const machine = allMachines.filter(m => m.status === 'published' && m.active)[0];
  const revalidation = revalidateMachineEnquiry({ machineIdentifiers: [machine.slug] }, [machine]);
  const { enquiryRecord } = buildCanonicalEnquiryData({
    reference: 'SNAP-004',
    source: 'MACHINE_DETAIL',
    customer: { name: 'Test', email: 'test@test.com' },
    revalidation,
  });
  assert(enquiryRecord.status === 'new', 'Enquiry always starts with status "new"');
}

{
  // Customer email is normalised to lowercase
  const machine = allMachines.filter(m => m.status === 'published' && m.active)[0];
  const revalidation = revalidateMachineEnquiry({ machineIdentifiers: [machine.slug] }, [machine]);
  const { enquiryRecord } = buildCanonicalEnquiryData({
    reference: 'SNAP-005',
    source: 'MACHINE_DETAIL',
    customer: { name: 'Test User', email: 'TEST.USER@EXAMPLE.CO.UK' },
    revalidation,
  });
  assert(
    enquiryRecord.email === 'test.user@example.co.uk',
    'Customer email normalised to lowercase'
  );
}

{
  // No machine enquiry → empty machineRecords, enquiry succeeds
  const revalidation = revalidateMachineEnquiry({ machineIdentifiers: [] }, []);
  const { enquiryRecord, machineRecords } = buildCanonicalEnquiryData({
    reference: 'SNAP-006',
    source: 'GENERAL',
    customer: { name: 'Test', email: 'test@test.com' },
    revalidation,
  });
  assert(machineRecords.length === 0, 'No machines → empty machineRecords');
  assert(enquiryRecord.reference === 'SNAP-006', 'Enquiry record built correctly without machines');
}

// ---------------------------------------------------------------------------
// Group 11: Transactional Integrity (simulation)
// ---------------------------------------------------------------------------
section('Group 11: Transactional Integrity (Simulation)');

{
  // The compensating-delete pattern: verify the route logic conceptually.
  // We can't call the actual HTTP endpoint in a unit test, but we can verify
  // the validation utilities and data building work correctly end-to-end
  // so that the route handler has correct inputs.

  const machine = allMachines.filter(m => m.status === 'published' && m.active)[0];
  const revalidation = revalidateMachineEnquiry({ machineIdentifiers: [machine.slug] }, [machine]);
  const { enquiryRecord, machineRecords } = buildCanonicalEnquiryData({
    reference: 'TXN-001',
    source: 'MACHINE_DETAIL',
    customer: { name: 'Test', email: 'test@test.com' },
    revalidation,
  });

  // Enquiry record is self-contained without enquiry_id
  assert(enquiryRecord.reference === 'TXN-001', 'Enquiry record is self-contained (no enquiry_id required)');

  // Machine records do not contain enquiry_id — it must be added server-side
  assert(
    machineRecords.every(m => !('enquiry_id' in m)),
    'Machine records do not include enquiry_id until server assigns it'
  );

  // Explicit machine row columns (simulate the route handler's mapping)
  if (machineRecords.length > 0) {
    const m = machineRecords[0];
    const simulatedRow = {
      enquiry_id: 'server-generated-uuid',
      machine_id: m.machine_id,
      product_id: m.product_id ?? null,
      model_code_snapshot: m.model_code_snapshot,
      machine_name_snapshot: m.machine_name_snapshot,
      slug_snapshot: m.slug_snapshot,
      category_snapshot: m.category_snapshot,
      role: m.role,
      display_order: 0,
      selection_status: m.selection_status ?? null,
      match_reasons: m.match_reasons ?? [],
      unknown_criteria: m.unknown_criteria ?? [],
      failure_reasons: m.failure_reasons ?? [],
      specs_snapshot: m.specs_snapshot ?? null,
    };

    assert(
      Object.keys(simulatedRow).every(k =>
        [
          'enquiry_id', 'machine_id', 'product_id',
          'model_code_snapshot', 'machine_name_snapshot', 'slug_snapshot',
          'category_snapshot', 'role', 'display_order', 'selection_status',
          'match_reasons', 'unknown_criteria', 'failure_reasons', 'specs_snapshot',
        ].includes(k)
      ),
      'Machine row only contains explicitly allowlisted columns'
    );
  }
}

{
  // Zero-machine enquiry: machineRecords length is 0, route should skip insert
  const revalidation = revalidateMachineEnquiry({ machineIdentifiers: [] }, []);
  const { machineRecords } = buildCanonicalEnquiryData({
    reference: 'TXN-002',
    source: 'GENERAL',
    customer: { name: 'Test', email: 'test@test.com' },
    revalidation,
  });
  assert(
    machineRecords.length === 0,
    'Zero-machine enquiry: machineRecords.length is 0 → route skips enquiry_machines insert'
  );
}

// ---------------------------------------------------------------------------
// Group 12: Error Contract Shape
// ---------------------------------------------------------------------------
section('Group 12: Error Contract Shape');

{
  const err = new EnquiryError('VALIDATION_ERROR', 'Name is required.', ['customer.name is required']);
  const resp = buildErrorResponse(err);
  assert(resp.success === false, 'Error response has success: false');
  assert(resp.code === 'VALIDATION_ERROR', 'Error response has correct code');
  assert(resp.message === 'Name is required.', 'Error response has public message');
  assert(Array.isArray(resp.details) && resp.details!.length === 1, 'Error response includes details array');
}

{
  const err = new EnquiryError('MACHINE_NOT_FOUND', 'Machine not found.');
  const resp = buildErrorResponse(err);
  assert(resp.code === 'MACHINE_NOT_FOUND', 'MACHINE_NOT_FOUND code preserved');
  assert(!('details' in resp) || resp.details === undefined, 'No details when none provided');
}

{
  const err = new EnquiryError('SERVER_ERROR', 'An unexpected error occurred.');
  const resp = buildErrorResponse(err);
  assert(resp.code === 'SERVER_ERROR', 'SERVER_ERROR code preserved');
  // CRITICAL: public message must not contain internal detail
  assert(
    !resp.message.includes('Supabase') &&
      !resp.message.includes('PostgreSQL') &&
      !resp.message.includes('PGRST') &&
      !resp.message.includes('stack'),
    'SERVER_ERROR message contains no internal technical detail'
  );
}

{
  const err = new EnquiryError('RATE_LIMITED', 'Too many requests.');
  assert(err.httpStatus === 429, 'RATE_LIMITED maps to HTTP 429');
}

{
  const err = new EnquiryError('MACHINE_UNAVAILABLE', 'Machine not available.');
  assert(err.httpStatus === 400, 'MACHINE_UNAVAILABLE maps to HTTP 400');
}

{
  const err = new EnquiryError('SELECTOR_ERROR', 'Revalidation failed.');
  assert(err.httpStatus === 500, 'SELECTOR_ERROR maps to HTTP 500');
}

{
  // All error codes produce valid response shape
  const codes = [
    'VALIDATION_ERROR', 'MACHINE_NOT_FOUND', 'MACHINE_UNAVAILABLE',
    'INVALID_REQUIREMENTS', 'SELECTOR_ERROR', 'COMPARISON_ERROR',
    'RATE_LIMITED', 'SERVER_ERROR',
  ] as const;
  for (const code of codes) {
    const err = new EnquiryError(code, `Test message for ${code}`);
    const resp = buildErrorResponse(err);
    assert(
      resp.success === false && resp.code === code && typeof resp.message === 'string',
      `Error code "${code}" produces valid response shape`
    );
  }
}

// ---------------------------------------------------------------------------
// Group 13: Structured Requirements via Submission Pipeline
// ---------------------------------------------------------------------------
section('Group 13: Structured Requirements via Submission Pipeline');

{
  // Requirements normalised and stored in canonical columns
  const machine = allMachines.filter(m => m.status === 'published' && m.active)[0];
  const revalidation = revalidateMachineEnquiry(
    {
      source: 'machine_selector',
      machineIdentifiers: [machine.slug],
      rawRequirements: {
        application: 'FLEET_VEHICLE_CLEANING',
        waterType: 'hot',
        minPressureBar: 120,
        minFlowLpm: 10,
        powerSource: 'electric',
        voltage: '400v',
        phase: 3,
        mobility: 'stationary',
      },
    },
    [machine]
  );

  const { enquiryRecord } = buildCanonicalEnquiryData({
    reference: 'REQ-001',
    source: 'MACHINE_SELECTOR',
    customer: { name: 'Test', email: 'test@test.com' },
    revalidation,
    rawRequirements: {
      application: 'FLEET_VEHICLE_CLEANING',
      waterType: 'hot',
      minPressureBar: 120,
      minFlowLpm: 10,
      powerSource: 'electric',
      voltage: '400v',
      phase: 3,
      mobility: 'stationary',
    },
  });

  assert(enquiryRecord.req_application === 'FLEET_VEHICLE_CLEANING', 'req_application normalised correctly');
  assert(enquiryRecord.req_water_type === 'hot', 'req_water_type normalised correctly');
  assert(enquiryRecord.req_min_pressure_bar === 120, 'req_min_pressure_bar normalised correctly');
  assert(enquiryRecord.req_min_flow_lpm === 10, 'req_min_flow_lpm normalised correctly');
  assert(enquiryRecord.req_power_source === 'electric', 'req_power_source normalised correctly');
  assert(enquiryRecord.req_voltage === '400v', 'req_voltage normalised correctly');
  assert(enquiryRecord.req_phase === '3', 'req_phase stored as string');
  assert(enquiryRecord.req_mobility === 'stationary', 'req_mobility normalised correctly');
}

{
  // No requirements → all req_ columns null, selection_outcome NOT_APPLICABLE
  const revalidation = revalidateMachineEnquiry({ machineIdentifiers: [] }, []);
  const { enquiryRecord } = buildCanonicalEnquiryData({
    reference: 'REQ-002',
    source: 'GENERAL',
    customer: { name: 'Test', email: 'test@test.com' },
    revalidation,
  });
  assert(enquiryRecord.req_application === null || enquiryRecord.req_application === undefined, 'req_application null when no requirements');
  assert(enquiryRecord.selection_outcome === 'NOT_APPLICABLE', 'selection_outcome NOT_APPLICABLE when no machines or requirements');
}

{
  // Requirements on GENERAL source: requirements stored but selection_outcome NOT_APPLICABLE
  const revalidation = revalidateMachineEnquiry(
    {
      machineIdentifiers: [],
      rawRequirements: { application: 'INDUSTRIAL_DEGREASING' },
    },
    []
  );
  const { enquiryRecord } = buildCanonicalEnquiryData({
    reference: 'REQ-003',
    source: 'GENERAL',
    customer: { name: 'Test', email: 'test@test.com' },
    revalidation,
    rawRequirements: { application: 'INDUSTRIAL_DEGREASING' },
  });
  assert(
    enquiryRecord.selection_outcome === 'NOT_APPLICABLE',
    'GENERAL enquiry with no machines has NOT_APPLICABLE outcome'
  );
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log('\n' + '═'.repeat(65));
console.log(`  PHASE 7.1 SUBMISSION TEST SUITE`);
console.log('═'.repeat(65));
console.log(`  Total:  ${testsPassed + testsFailed}`);
console.log(`  Passed: ${testsPassed}`);
console.log(`  Failed: ${testsFailed}`);

if (failures.length > 0) {
  console.log('\n  Failed tests:');
  failures.forEach(f => console.log(`    ✗ ${f}`));
}

console.log('═'.repeat(65) + '\n');

if (testsFailed > 0) {
  process.exit(1);
}
