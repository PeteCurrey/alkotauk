import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'alkota-dev-secret-please-set-in-production'
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
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function generateReference(type: string): string {
  const typeCode = type.substring(0, 1).toUpperCase();
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `ALK-${typeCode}-${year}-${rand}`;
}
