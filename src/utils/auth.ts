import type { AstroCookies } from 'astro';

export const ADMIN_PASSCODE = import.meta.env.ADMIN_PASSCODE || import.meta.env.PUBLIC_ADMIN_PASSCODE || '@Putra714';

export function isAuthenticated(cookies: AstroCookies): boolean {
  return cookies.get('admin_token')?.value === ADMIN_PASSCODE;
}
