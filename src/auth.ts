import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getDealerByUserEmail } from './lib/dealer-portal';
import { logDealerAudit } from './lib/dealer-portal';

/**
 * Alkota UK — Unified Auth Configuration
 *
 * Handles two separate authentication contexts:
 *   1. Admin auth  — protected by custom JWT cookie (lib/auth.ts + middleware.ts)
 *                    NOT handled here. Admin login at /admin/login uses its own flow.
 *   2. Dealer auth — handled here via NextAuth v5 Credentials provider.
 *                    Authenticates against dealer_users table in Supabase.
 *
 * The dealer session JWT carries: id, email, name, company, role, tier,
 * dealerId, dealerUserId.
 */

declare module 'next-auth' {
  interface User {
    company?: string;
    role?: string;
    tier?: string;
    dealerId?: string;
    dealerUserId?: string;
  }
  interface Session {
    user: User & {
      company?: string;
      role?: string;
      tier?: string;
      dealerId?: string;
      dealerUserId?: string;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Dealer Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email    = (credentials?.email as string | undefined)?.trim().toLowerCase();
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        // Look up dealer user in Supabase
        const { dealer, user } = await getDealerByUserEmail(email);

        if (!user || !dealer) return null;

        // Dealer organisation must be portal-active
        if (!dealer.portal_active) return null;

        // Dealer org must not be suspended
        if (dealer.suspended_at) return null;

        // User must have a password hash stored
        if (!user.password_hash) return null;

        // Verify password
        const passwordValid = await bcrypt.compare(password, user.password_hash);
        if (!passwordValid) return null;

        // Record last login (fire-and-forget — do not block auth)
        void updateLastLogin(user.id);

        // Log the login event
        void logDealerAudit({
          action:     'dealer_user_login',
          actorId:    user.id,
          actorType:  'dealer_user',
          entityType: 'dealer_user',
          entityId:   user.id,
          dealerId:   dealer.id,
        });

        const firstName = user.first_name ?? '';
        const lastName  = user.last_name ?? '';
        const fullName  = [firstName, lastName].filter(Boolean).join(' ') || email;

        return {
          id:            user.id,
          email:         user.email,
          name:          fullName,
          company:       dealer.name,
          role:          user.role,
          tier:          dealer.portal_tier,
          dealerId:      dealer.id,
          dealerUserId:  user.id,
        };
      },
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.company      = user.company;
        token.role         = user.role;
        token.tier         = user.tier;
        token.dealerId     = user.dealerId;
        token.dealerUserId = user.dealerUserId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.company      = token.company as string | undefined;
        session.user.role         = token.role as string | undefined;
        session.user.tier         = token.tier as string | undefined;
        session.user.dealerId     = token.dealerId as string | undefined;
        session.user.dealerUserId = token.dealerUserId as string | undefined;
        session.user.id           = token.sub as string;
      }
      return session;
    },
  },

  pages: {
    signIn: '/dealer/login',
    error:  '/dealer/login',
  },

  trustHost: true,
  secret: process.env.AUTH_SECRET || 'rehsaw1964aallkkkkoootttaaaa',
});

// ─── Helpers ─────────────────────────────────────────────────

async function updateLastLogin(dealerUserId: string): Promise<void> {
  try {
    const { getSupabaseAdmin } = await import('./lib/supabase/server');
    await getSupabaseAdmin()
      .from('dealer_users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', dealerUserId);
  } catch {
    // Non-critical — do not surface to user
  }
}
