import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fail-safe initialization to prevent global crashes on Vercel
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({
          eq: () => ({
            order: () => ({
              then: (resolve: any) => resolve({ data: [], error: null })
            }),
            then: (resolve: any) => resolve({ data: [], error: null })
          }),
          order: () => ({
            then: (resolve: any) => resolve({ data: [], error: null })
          }),
          then: (resolve: any) => resolve({ data: [], error: null })
        }),
      }),
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      }
    } as any;
