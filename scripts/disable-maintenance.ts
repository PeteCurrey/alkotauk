import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual parse for .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const [key, ...value] = line.trim().split('=');
  if (key && value.length) env[key] = value.join('=');
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function disableMaintenance() {
  console.log('--- DISABLING MAINTENANCE MODE ---');
  const { data, error } = await supabase
    .from('site_settings')
    .upsert({ key: 'maintenance_mode', value: 'false', updated_at: new Date().toISOString() }, { onConflict: 'key' })
    .select();

  if (error) {
    console.error('Error updating maintenance mode:', error.message);
    process.exit(1);
  }

  console.log('Successfully disabled maintenance mode.');
  console.log('Result:', data);
}

disableMaintenance();
