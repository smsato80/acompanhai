import { createHash, randomBytes } from 'node:crypto';

export const PORTAL_COOKIE = 'acompanhai_portal_session';
export const PORTAL_SESSION_MAX_AGE = 60 * 60 * 24;

export function createPortalToken(): string {
  return randomBytes(32).toString('base64url');
}

export function hashPortalToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}

export function getPortalCookieOptions(maxAge = PORTAL_SESSION_MAX_AGE) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  };
}
