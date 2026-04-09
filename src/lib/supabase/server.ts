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
  : {
      from: () => ({
        select: () => ({
          eq: () => ({
            order: () => ({
              limit: () => Promise.resolve({ data: [], error: null }),
              then: (resolve: any) => resolve({ data: [], error: null })
            }),
            maybeSingle: () => Promise.resolve({ data: null, error: null }),
            then: (resolve: any) => resolve({ data: [], error: null })
          }),
          then: (resolve: any) => resolve({ data: [], error: null })
        })
      })
    } as any;
