import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { isAuthenticated } from '../../utils/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('cv') as File;
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'File tidak ditemukan' }), { status: 400 });
    }

    // Validate type (must be pdf)
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return new Response(JSON.stringify({ error: 'Hanya diperbolehkan mengunggah file berekstensi .pdf' }), { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Save PDF file inside public/ directory
    const publicDir = path.resolve('public');
    const destPath = path.join(publicDir, 'resume.pdf');
    
    fs.mkdirSync(publicDir, { recursive: true });
    fs.writeFileSync(destPath, buffer);

    // Update profile.json's resumeUrl
    const profilePath = path.resolve('src/data/profile.json');
    const profile = JSON.parse(fs.readFileSync(profilePath, 'utf-8'));
    profile.resumeUrl = '/resume.pdf';
    fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2), 'utf-8');

    return new Response(JSON.stringify({ success: true, url: '/resume.pdf' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
