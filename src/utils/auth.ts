import type { AstroCookies } from 'astro';

export const ADMIN_PASSCODE = import.meta.env.ADMIN_PASSCODE || 'admin123';

export function isAuthenticated(cookies: AstroCookies): boolean {
  return cookies.get('admin_token')?.value === ADMIN_PASSCODE;
}
