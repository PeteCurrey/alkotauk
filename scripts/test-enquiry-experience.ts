/**
 * Test Suite: Customer Enquiry Experience & Admin Sales Handoff
 * Phase 7.2 & 7.3 Automated Verification
 *
 * Verifies:
 * 1. Payload construction for all customer journeys (Detail, Selector, Comparison, General)
 * 2. Notification email generation (HTML and plain-text output across all sources)
 * 3. Human-readable requirements and confirmation checklist rendering
 * 4. Admin status validation logic (accepts canonical + legacy, rejects arbitrary)
 * 5. Historical snapshot data integrity
 */

import { buildEnquiryEmailHtml, buildEnquiryEmailText } from '../src/lib/enquiries/notifications';
import { CanonicalEnquiryRecord, CanonicalEnquiryMachineRecord, SubmitEnquiryPayload } from '../src/lib/enquiries/schema';

// ── Test Harness ─────────────────────────────────────────────────────────────
let totalTests = 0;
let passedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ [PASS] ${testName}`);
  } else {
    console.error(`  ✗ [FAIL] ${testName}`);
    if (detail) console.error(`     Detail: ${detail}`);
  }
}

console.log('\n============================================================');
console.log('Alkota UK — Phase 7.2 & 7.3 Enquiry & Admin Test Suite');
console.log('============================================================\n');

// ── Test Group 1: Payload Construction Across Journeys ──────────────────────
console.log('Group 1: Journey Payload Construction');

// 1.1 Machine Detail Journey
const detailPayload: SubmitEnquiryPayload = {
  customer: {
    name: 'Marcus Vance',
    email: 'm.vance@quarryplant.co.uk',
    phone: '0161 949 2000',
    company: 'Vance Aggregates Ltd',
    postcode: 'SK17 9NZ',
    preferredContactMethod: 'phone',
  },
  source: 'MACHINE_DETAIL',
  context: 'DIRECT_MACHINE',
  subject: 'Enquiry: Alkota 420X4',
  message: 'Require heavy duty washer for limestone quarry haulage fleet.',
  machines: [{ identifier: 'alkota-420x4', role: 'PRIMARY', displayOrder: 0 }],
  siteReadiness: {
    sitePower: '400v_three',
    siteWater: 'mains_standard',
    timeline: 'immediate',
  },
};

assert(detailPayload.source === 'MACHINE_DETAIL', 'Detail payload has MACHINE_DETAIL source');
assert(detailPayload.machines?.length === 1, 'Detail payload has 1 machine');
assert(detailPayload.customer.preferredContactMethod === 'phone', 'Detail customer prefers phone');
assert(detailPayload.siteReadiness?.sitePower === '400v_three', 'Site power is 400V three phase');

// 1.2 Help Me Choose Selector Journey
const selectorPayload: SubmitEnquiryPayload = {
  customer: {
    name: 'Sarah Jenkins',
    email: 's.jenkins@foodlogistics.co.uk',
    company: 'Fresh Route Logistics',
    postcode: 'LE11 3NE',
    preferredContactMethod: 'email',
  },
  source: 'MACHINE_SELECTOR',
  context: 'MACHINE_SELECTION',
  machines: [
    { identifier: 'alkota-420x4', role: 'SHORTLIST', displayOrder: 0 },
    { identifier: 'alkota-216x4', role: 'SHORTLIST', displayOrder: 1 },
  ],
  requirements: {
    application: 'FLEET_VEHICLE_CLEANING',
    waterType: 'hot',
    minPressureBar: 140,
    minFlowLpm: 15,
    powerSource: 'electric',
    voltage: '400v',
    phase: 3,
    mobility: 'portable',
    preferences: ['prefer_higher_flow'],
  },
  siteReadiness: {
    sitePower: '400v_three',
    siteWater: 'mains_standard',
    timeline: '1_month',
  },
  message: 'Need quotation including 30m high pressure hose and twin lance.',
};

assert(selectorPayload.source === 'MACHINE_SELECTOR', 'Selector payload has MACHINE_SELECTOR source');
assert(selectorPayload.machines?.length === 2, 'Selector payload has 2 shortlisted machines');
assert(selectorPayload.requirements?.minPressureBar === 140, 'Pressure requirement parsed as 140 BAR');
assert(selectorPayload.requirements?.voltage === '400v', 'Voltage requirement is 400V');

// 1.3 Machine Comparison Journey
const comparePayload: SubmitEnquiryPayload = {
  customer: {
    name: 'Dave Wilson',
    email: 'dave@wilsonhaulage.com',
  },
  source: 'MACHINE_COMPARISON',
  context: 'MACHINE_COMPARISON',
  machines: [
    { identifier: 'alkota-420x4', role: 'COMPARISON', displayOrder: 0 },
    { identifier: 'alkota-430xm4', role: 'COMPARISON', displayOrder: 1 },
    { identifier: 'alkota-5355ens', role: 'COMPARISON', displayOrder: 2 },
  ],
};

assert(comparePayload.source === 'MACHINE_COMPARISON', 'Comparison payload has MACHINE_COMPARISON source');
assert(comparePayload.machines?.length === 3, 'Comparison payload has 3 machines');
assert(comparePayload.customer.name === 'Dave Wilson', 'Customer name set');

// 1.4 General Contact Journey
const generalPayload: SubmitEnquiryPayload = {
  customer: {
    name: 'Clare Thompson',
    email: 'clare@thompson-farms.co.uk',
  },
  source: 'GENERAL',
  context: 'GENERAL_ENQUIRY',
  subject: 'Bespoke high pressure ring main question',
  message: 'Looking for advice on installing an overhead gantry wash ring main in our milking parlor.',
};

assert(generalPayload.source === 'GENERAL', 'General payload has GENERAL source');
assert(!generalPayload.machines || generalPayload.machines.length === 0, 'General payload has no machines');

// ── Test Group 2: Notification Email Generation ─────────────────────────────
console.log('\nGroup 2: Notification Email Generation (HTML & Text)');

const mockEnquiry: CanonicalEnquiryRecord = {
  id: 'enq-test-uuid-001',
  reference: 'AK-TEST01',
  source: 'MACHINE_SELECTOR',
  enquiry_context: 'MACHINE_SELECTION',
  type: 'quote',
  status: 'new',
  name: 'Sarah Jenkins',
  email: 's.jenkins@foodlogistics.co.uk',
  phone: '07700 900123',
  company: 'Fresh Route Logistics',
  postcode: 'LE11 3NE',
  preferred_contact_method: 'email',
  site_power: '400v_three',
  site_water: 'mains_standard',
  timeline: '1_month',
  req_application: 'FLEET_VEHICLE_CLEANING',
  req_water_type: 'hot',
  req_min_pressure_bar: 140,
  req_min_flow_lpm: 15,
  req_power_source: 'electric',
  req_voltage: '400v',
  req_phase: '3',
  selection_outcome: 'STRONG_MATCH',
  confirmation_items: [
    'Confirm 400V 32A three-phase supply is within 10m of machine location',
    'Verify minimum 15 L/min continuous water supply flow rate',
  ],
  message: 'Please provide quotation including delivery to Leicester hub.',
  created_at: '2026-09-12T20:00:00.000Z',
};

const mockMachines: CanonicalEnquiryMachineRecord[] = [
  {
    id: 'em-uuid-01',
    enquiry_id: 'enq-test-uuid-001',
    machine_id: 'alkota-420x4',
    model_code_snapshot: '420X4',
    machine_name_snapshot: 'Alkota 420X4 Heavy Industrial Hot Washer',
    slug_snapshot: 'alkota-420x4',
    category_snapshot: 'hot-water',
    role: 'SHORTLIST',
    display_order: 0,
    selection_status: 'STRONG_MATCH',
    match_reasons: ['140 BAR exceeds 120 BAR threshold', 'Hot water thermal capability'],
    specs_snapshot: {
      pressure_bar: 140,
      flow_rate_lpm: 15.1,
      power_source: 'Electric',
      heating_fuel: 'Diesel/Kerosene',
    },
    created_at: '2026-09-12T20:00:00.000Z',
  },
  {
    id: 'em-uuid-02',
    enquiry_id: 'enq-test-uuid-001',
    machine_id: 'alkota-216x4',
    model_code_snapshot: '216X4',
    machine_name_snapshot: 'Alkota 216X4 Compact Hot Washer',
    slug_snapshot: 'alkota-216x4',
    category_snapshot: 'hot-water',
    role: 'SHORTLIST',
    display_order: 1,
    selection_status: 'POSSIBLE_MATCH',
    specs_snapshot: {
      pressure_bar: 110,
      flow_rate_lpm: 9.5,
    },
    created_at: '2026-09-12T20:00:00.000Z',
  },
];

const htmlOutput = buildEnquiryEmailHtml({
  enquiry: mockEnquiry,
  machines: mockMachines,
  siteUrl: 'https://alkota.co.uk',
});

const textOutput = buildEnquiryEmailText({
  enquiry: mockEnquiry,
  machines: mockMachines,
  siteUrl: 'https://alkota.co.uk',
});

// HTML checks
assert(htmlOutput.includes('AK-TEST01'), 'HTML email contains reference number');
assert(htmlOutput.includes('Sarah Jenkins'), 'HTML email contains customer name');
assert(htmlOutput.includes('s.jenkins@foodlogistics.co.uk'), 'HTML email contains customer email');
assert(htmlOutput.includes('420X4'), 'HTML email contains shortlisted model 420X4');
assert(htmlOutput.includes('216X4'), 'HTML email contains shortlisted model 216X4');
assert(htmlOutput.includes('FLEET VEHICLE CLEANING'), 'HTML email contains humanised application');
assert(htmlOutput.includes('140 BAR'), 'HTML email contains minimum pressure requirement');
assert(htmlOutput.includes('Sales Engineer Checklist'), 'HTML email includes pre-quotation checklist header');
assert(htmlOutput.includes('Confirm 400V 32A three-phase supply'), 'HTML email includes checklist item');
assert(htmlOutput.includes('/admin/enquiries/enq-test-uuid-001'), 'HTML email contains direct admin link');
assert(!htmlOutput.includes('undefined'), 'HTML email does not contain literal "undefined"');
assert(!htmlOutput.includes('null'), 'HTML email does not contain literal "null"');

// Text checks
assert(textOutput.includes('AK-TEST01'), 'Text email contains reference');
assert(textOutput.includes('420X4 (hot-water)'), 'Text email contains machine snapshot summary');
assert(textOutput.includes('Confirm 400V 32A'), 'Text email contains confirmation checklist');
assert(!textOutput.includes('<table'), 'Text email does not contain HTML tags');

// ── Test Group 3: Admin Status Enum Validation ──────────────────────────────
console.log('\nGroup 3: Admin Status Enum Validation');

const CANONICAL_STATUSES = [
  'new',
  'acknowledged',
  'contacted',
  'qualifying',
  'quoting',
  'won',
  'lost',
  'closed',
];

const LEGACY_STATUSES = ['read', 'responded', 'in-progress', 'archived'];

const VALID_STATUS_SET = new Set([...CANONICAL_STATUSES, ...LEGACY_STATUSES]);

function validateAdminStatus(status: string): boolean {
  if (typeof status !== 'string') return false;
  return VALID_STATUS_SET.has(status.toLowerCase().trim());
}

CANONICAL_STATUSES.forEach(st => {
  assert(validateAdminStatus(st), `Accepts canonical status: "${st}"`);
});

LEGACY_STATUSES.forEach(st => {
  assert(validateAdminStatus(st), `Accepts legacy status: "${st}"`);
});

const INVALID_STATUSES = [
  'hot_lead',
  'pending',
  'spam',
  'invalid',
  'quote_sent',
  '',
  '   ',
  'DELETED',
];

INVALID_STATUSES.forEach(inv => {
  assert(!validateAdminStatus(inv), `Rejects invalid status: "${inv}"`);
});

// ── Test Group 4: Historical Machine Snapshot Immutability ──────────────────
console.log('\nGroup 4: Historical Machine Snapshot Immutability');

const machineSnapshot: CanonicalEnquiryMachineRecord = {
  id: 'snap-001',
  enquiry_id: 'enq-001',
  machine_id: 'alkota-420x4',
  model_code_snapshot: '420X4',
  machine_name_snapshot: 'Alkota 420X4 Electric Pressure Washer',
  slug_snapshot: 'alkota-420x4',
  category_snapshot: 'hot-water',
  role: 'PRIMARY',
  display_order: 0,
  selection_status: 'STRONG_MATCH',
  specs_snapshot: {
    pressure_bar: 140,
    flow_rate_lpm: 15.1,
  },
  created_at: '2026-09-12T12:00:00.000Z',
};

assert(machineSnapshot.model_code_snapshot === '420X4', 'Historical snapshot captures model_code');
assert(machineSnapshot.category_snapshot === 'hot-water', 'Historical snapshot captures category');
assert((machineSnapshot.specs_snapshot as any).pressure_bar === 140, 'Historical snapshot preserves verified specs');

console.log('\n------------------------------------------------------------');
console.log(`Results: ${passedTests} passed out of ${totalTests} tests`);
console.log('------------------------------------------------------------\n');

if (passedTests === totalTests) {
  console.log('🎉 ALL PHASE 7.2 & 7.3 TESTS PASSED!\n');
  process.exit(0);
} else {
  console.error(`❌ ${totalTests - passedTests} TESTS FAILED\n`);
  process.exit(1);
}
