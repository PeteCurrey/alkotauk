/**
 * Hash Password Script
 * Usage: npx tsx scripts/hash-password.ts yourpassword
 * Copy the output hash into ADMIN_PASSWORD_HASH in .env.local
 * or run this against your Supabase admin_config table.
 */
import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
  console.error('Usage: npx tsx scripts/hash-password.ts yourpassword');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 10);
console.log('\nHashed password:');
console.log(hash);
console.log('\nSet this as ADMIN_PASSWORD_HASH in .env.local');
console.log('Or run: UPDATE admin_config SET value = \'' + hash + '\' WHERE key = \'password_hash\';');
