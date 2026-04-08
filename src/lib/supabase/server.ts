import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Fail-safe initialization to prevent global crashes on Vercel
export const supabaseAdmin = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : new Proxy({} as any, {
      get: () => {
        // Log the error but don't crash the server
        console.warn('Supabase Admin Client accessed but not initialized. Check your environment variables.');
        const mock = {
          from: () => mock,
          select: () => mock,
          eq: () => mock,
          order: () => mock,
          match: () => mock,
          single: () => Promise.resolve({ data: null, error: null }),
          maybeSingle: () => Promise.resolve({ data: null, error: null }),
          then: (cb: any) => cb({ data: [], error: null }),
        };
        return mock;
      },
    });
