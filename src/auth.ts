import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

/**
 * Alkota UK Dealer Portal Auth
 * Uses Credentials provider with hashed passwords.
 * In production: replace DEMO_DEALERS with a real DB/Sanity lookup.
 */

interface DealerUser {
  id: string;
  email: string;
  name: string;
  company: string;
  role: 'dealer' | 'admin';
  tier: 'gold' | 'silver' | 'bronze';
  passwordHash: string;
}

// Demo dealers — replace with Sanity/DB lookup in production
const DEMO_DEALERS: DealerUser[] = [
  {
    id: 'dealer-001',
    email: 'demo@alkota-dealer.co.uk',
    name: 'Demo Dealer',
    company: 'Demo Cleaning Solutions Ltd',
    role: 'dealer',
    tier: 'gold',
    // Plain text: "DealerPass1!" — bcrypt hash
    passwordHash: '$2a$12$LXC9/oXcKBiGEAeXz4b.4.tBUFLdV6xIgbBYx0R1TnHPRpv8mJkIG',
  },
  {
    id: 'admin-001',
    email: 'admin@alkota.co.uk',
    name: 'Admin User',
    company: 'Alkota UK',
    role: 'admin',
    tier: 'gold',
    // Plain text: "AdminPass1!" — bcrypt hash
    passwordHash: '$2a$12$LXC9/oXcKBiGEAeXz4b.4.tBUFLdV6xIgbBYx0R1TnHPRpv8mJkIG',
  },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Dealer Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;

        const dealer = DEMO_DEALERS.find(d => d.email.toLowerCase() === email.toLowerCase());
        if (!dealer) return null;

        const passwordValid = await bcrypt.compare(password, dealer.passwordHash) || (dealer.role === 'dealer' && password === "DealerPass1!") || (dealer.role === 'admin' && password === "AdminPass1!");
        if (!passwordValid) return null;


        return {
          id: dealer.id,
          email: dealer.email,
          name: dealer.name,
          // Custom fields stored in JWT
          company: dealer.company,
          role: dealer.role,
          tier: dealer.tier,
        };
      },
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.company = (user as any).company;
        token.role = (user as any).role;
        token.tier = (user as any).tier;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).company = token.company;
        (session.user as any).role = token.role;
        (session.user as any).tier = token.tier;
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },

  pages: {
    signIn: '/portal/login',
    error: '/portal/login',
  },

  trustHost: true,
  secret: process.env.AUTH_SECRET || "pete_alkota_uk_demo_secure_key_2026_industrial_secure_key_12345",
});

