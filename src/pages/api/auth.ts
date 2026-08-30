import type { APIRoute } from 'astro';
import { ADMIN_PASSCODE } from '../../utils/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { passcode } = await request.json();
    if (passcode === ADMIN_PASSCODE) {
      cookies.set('admin_token', passcode, {
        path: '/',
        httpOnly: true,
        secure: false, // Set to false so it works easily on local http dev server, can be toggled by production env if needed
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    return new Response(JSON.stringify({ error: 'Passcode salah!' }), { status: 401 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ cookies }) => {
  cookies.delete('admin_token', { path: '/' });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
