import * as fs from 'fs';

async function testSql() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Test Supabase SQL endpoint
  try {
    const res = await fetch(`${url}/rest/v1/rpc`, {
      method: 'POST',
      headers: {
        'apikey': key!,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    console.log('RPC endpoint status:', res.status);
  } catch (e: any) {
    console.log('RPC error:', e.message);
  }
}

testSql();
