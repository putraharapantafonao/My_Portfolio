import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { uploadToGithub } from '../../utils/github';
import { isAuthenticated } from '../../utils/auth';

const filePath = path.resolve('src/data/profile.json');

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
    
    let existing = {};
    if (fs.existsSync(filePath)) {
      try {
        existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch (e) {}
    }
    
    const merged = { ...existing, ...body };
    try { fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf-8'); } catch (e) {}
    await uploadToGithub('src/data/profile.json', JSON.stringify(merged, null, 2), 'Update profile');
    
    return new Response(JSON.stringify({ success: true, data: merged }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
