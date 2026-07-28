import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { isAuthenticated } from '../../utils/auth';

const filePath = path.resolve('src/data/skills.json');

export const GET: APIRoute = async () => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await request.json();
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');
    return new Response(JSON.stringify({ success: true, data: body }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
