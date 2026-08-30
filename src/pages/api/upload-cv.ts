import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { isAuthenticated } from '../../utils/auth';
import { uploadToGithub } from '../../utils/github';

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
    const destPath = path.join(publicDir, 'cv.pdf');
    
    try {
      try { fs.mkdirSync(publicDir, { recursive: true }); } catch (e) {}
      try { fs.writeFileSync(destPath, buffer); } catch (e) {}
    } catch (e) {}
    await uploadToGithub('public/cv.pdf', buffer.toString('base64'), 'Upload resume', true);

    // Update profile.json's resumeUrl
    const profilePath = path.resolve('src/data/profile.json');
    let profile: any = { resumeUrl: '/cv.pdf' };
    try {
      profile = JSON.parse(fs.readFileSync(profilePath, 'utf-8'));
      profile.resumeUrl = '/cv.pdf';
      fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2), 'utf-8');
    } catch (e) {}
    await uploadToGithub('src/data/profile.json', JSON.stringify(profile, null, 2), 'Update resume URL');

    return new Response(JSON.stringify({ success: true, url: '/cv.pdf' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
