require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkMachines() {
  const { data, error } = await supabase.from('machines').select('*');
  if (error) {
    console.error('Supabase Error:', error.message);
  } else {
    console.log(`Success! Found ${data.length} machines in the database.`);
    if (data.length > 0) {
      console.log(`First machine: ${data[0].name}`);
    }
  }
}

checkMachines();
