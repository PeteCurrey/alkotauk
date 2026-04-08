import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fail-safe initialization to prevent global crashes on Vercel
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new Proxy({} as any, {
      get: () => {
        // Log the error but don't crash the server
        console.warn('Public Supabase Client accessed but not initialized. Check your environment variables.');
        const mock: any = {
          from: () => mock,
          select: () => mock,
          eq: () => mock,
          order: () => mock,
          match: () => mock,
          single: () => mock,
          maybeSingle: () => mock,
          then: (resolve: any) => Promise.resolve({ data: [], error: null }).then(resolve),
        };
        return mock;
      },
    });
