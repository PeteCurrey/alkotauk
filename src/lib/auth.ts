import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'd3ce8bd588e03e9ad002689d06ab8e9b'
);

export const COOKIE_NAME = 'alkota-admin-token';
export const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      clockTolerance: 60, // 60 seconds tolerance for clock skew between Edge and Node runtimes
    });
    return payload as Record<string, unknown>;
  } catch (err) {
    console.error('JWT Verification Failed:', err);
    return null;
  }
}

export function generateReference(type: string): string {
  const typeCode = type.substring(0, 1).toUpperCase();
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `ALK-${typeCode}-${year}-${rand}`;
}
