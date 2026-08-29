import assert from 'node:assert';
import {
  STORAGE_BUCKETS,
  validateStorageUpload,
  generateSignedDocumentUrl,
} from '../storage';
import {
  dispatchTrailerTransactionalEmail,
  TrailerEmailPayload,
} from '../email';

console.log('=== RUNNING ALKOTA TRAILER PHASE 07R REMEDIATION & INFRASTRUCTURE TEST ===\n');

// ─── 01: STORAGE CLASSIFICATION & VALIDATION ─────────────────────────────────

// Test 1: Buckets are classified into 3 distinct tiers
assert(STORAGE_BUCKETS.public_marketing.isPublic === true, 'Public bucket must be public');
assert(STORAGE_BUCKETS.customer_private.isPublic === false, 'Customer bucket must be private');
assert(STORAGE_BUCKETS.internal_only.isPublic === false, 'Internal bucket must be private');
console.log('✓ PASS: Storage buckets strictly segregated into Public, Customer Private, and Internal tiers');

// Test 2: Upload MIME validation
const invalidUpload = validateStorageUpload(
  { name: 'malicious.exe', type: 'application/x-msdownload', size: 1024 },
  'customer_private'
);
assert(invalidUpload.valid === false, 'Executable upload must be rejected');
console.log('✓ PASS: Non-permitted MIME types rejected by storage policy');

const validPdfUpload = validateStorageUpload(
  { name: 'handover-pack.pdf', type: 'application/pdf', size: 5 * 1024 * 1024 },
  'customer_private'
);
assert(validPdfUpload.valid === true, 'Valid PDF upload must be accepted');
console.log('✓ PASS: Valid PDF handover pack accepted under 30MB limit');

// ─── 02: TENANT ISOLATION & STORAGE SECURITY ─────────────────────────────────

async function testStorageSecurity() {
  // Test 3: Customer Org B attempting to access Customer Org A private document
  const crossTenantAccess = await generateSignedDocumentUrl({
    storagePath: 'ABP-2509-001/Rev_1.0/handover-pack.pdf',
    visibility: 'customer_private',
    requestingOrgId: 'org-client-b-449',
    buildOrgId: 'org-client-a-112',
  });
  assert(crossTenantAccess.authorized === false, 'Cross-tenant document access must be rejected');
  assert(crossTenantAccess.error?.includes('tenancy mismatch'), 'Error must specify tenancy mismatch');
  console.log('✓ PASS: Cross-tenant document access blocked (Customer B denied access to Customer A pack)');

  // Test 4: Customer attempting to access internal-only document
  const customerAccessInternal = await generateSignedDocumentUrl({
    storagePath: 'ABP-2509-001/Rev_1.0/internal-qa-notes.txt',
    visibility: 'internal_only',
    requestingOrgId: 'org-client-a-112',
    buildOrgId: 'org-client-a-112',
  });
  assert(customerAccessInternal.authorized === false, 'Customer cannot access internal-only files');
  assert(customerAccessInternal.error?.includes('Internal document'), 'Error must note internal restriction');
  console.log('✓ PASS: Internal workshop files blocked from customer access');

  // Test 5: Admin authenticated access to customer file
  const adminAccess = await generateSignedDocumentUrl({
    storagePath: 'ABP-2509-001/Rev_1.0/handover-pack.pdf',
    visibility: 'customer_private',
    requestingOrgId: 'admin-root',
    buildOrgId: 'org-client-a-112',
  });
  assert(adminAccess.authorized === true, 'Admin must be authorized across tenants');
  console.log('✓ PASS: Authenticated Alkota staff authorized for customer build files');
}

// ─── 03: TRANSACTIONAL EMAIL RESILIENCE & IDEMPOTENCY ────────────────────────

async function testEmailInfrastructure() {
  const testPayload: TrailerEmailPayload = {
    eventType: 'READY_FOR_HANDOVER',
    recipientEmail: 'client@hargreaves-env.co.uk',
    recipientName: 'James Hargreaves',
    buildReference: 'ABP-2509-001',
    buildCode: 'AKT-MRPQ47-UK',
    systemName: 'Alkota 3,500kg Enclosed Plant Room Rig',
    idempotencyKey: 'idem-test-handover-001',
  };

  // Test 6: Dispatch simulated / offline email
  const dispatch1 = await dispatchTrailerTransactionalEmail(testPayload);
  assert(dispatch1.success === true, 'Email dispatch handler must succeed or report status cleanly');
  assert(dispatch1.status === 'simulated' || dispatch1.status === 'sent', 'Status must be simulated or sent');
  console.log(`✓ PASS: Transactional email dispatched with state: ${dispatch1.status}`);

  // Test 7: Duplicate protection via idempotency key
  const dispatchDuplicate = await dispatchTrailerTransactionalEmail(testPayload);
  assert(dispatchDuplicate.success === true, 'Duplicate call handled gracefully');
  assert(dispatchDuplicate.status === 'queued', 'Duplicate event recognized and de-duplicated');
  assert(dispatchDuplicate.messageId?.startsWith('idempotent-duplicate'), 'Message ID notes idempotency');
  console.log('✓ PASS: Rapid duplicate email trigger caught by idempotency cache');
}

async function runAll() {
  await testStorageSecurity();
  await testEmailInfrastructure();
  console.log('\n======================================================');
  console.log('PHASE 07R REMEDIATION TESTS: ALL ASSERTIONS PASSED');
  console.log('======================================================\n');
}

runAll().catch(err => {
  console.error('Test failure:', err);
  process.exit(1);
});
