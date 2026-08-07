import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { isAuthenticated } from '../../utils/auth';
import { uploadToGithub } from '../../utils/github';

/**
 * Helper to save an uploaded file to the public directory.
 * Returns the public URL (e.g. "/project-image-169...png").
 */
async function saveFile(file: File, allowedExts: string[], prefix: string): Promise<string> {
  const ext = path.extname(file.name).toLowerCase();
  if (!allowedExts.includes(ext)) {
    throw new Error(`Format ${prefix} tidak valid. Diperbolehkan: ${allowedExts.join(', ')}`);
  }
  const fileName = `${prefix}-${Date.now()}${ext}`;
  const publicDir = path.resolve('public');
  const destPath = path.join(publicDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  
  try { try { fs.writeFileSync(destPath, buffer); } catch (e) {} } catch (e) {}
  await uploadToGithub(`public/${fileName}`, buffer.toString('base64'), `Upload ${fileName}`, true);
  
  return `/${fileName}`;
}

/**
 * Delete a previously stored image if it matches the given prefix pattern.
 */
function deleteOldImage(oldUrl: string | undefined, prefix: string) {
  if (!oldUrl) return;
  if (!oldUrl.startsWith(`/${prefix}-`)) return;
  const publicDir = path.resolve('public');
  const oldPath = path.join(publicDir, oldUrl.substring(1));
  if (fs.existsSync(oldPath)) {
    try { fs.unlinkSync(oldPath); } catch (_) {}
  }
}

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const formData = await request.formData();

    // Existing assets
    const faviconFile = formData.get('favicon') as File | null;
    const ogImageFile = formData.get('ogImage') as File | null;
    const profileImageFile = formData.get('profileImage') as File | null;

    // New assets + IDs
    const projectImageFile = formData.get('projectImage') as File | null;
    const projectId = formData.get('projectId') as string | null;

    const blogImageFile = formData.get('blogImage') as File | null;
    const blogId = formData.get('blogId') as string | null;

    const certificateImageFile = formData.get('certificateImage') as File | null;
    const certificateId = formData.get('certificateId') as string | null;

    const publicationImageFile = formData.get('publicationImage') as File | null;
    const publicationId = formData.get('publicationId') as string | null;

    const skillImageFile = formData.get('skillImage') as File | null;
    const skillId = formData.get('skillId') as string | null;

    const educationImageFile = formData.get('educationImage') as File | null;
    const educationId = formData.get('educationId') as string | null;

    const editorImageFile = formData.get('editorImage') as File | null;

    if (!faviconFile && !ogImageFile && !profileImageFile && !projectImageFile && !blogImageFile && !certificateImageFile && !publicationImageFile && !skillImageFile && !educationImageFile && !editorImageFile) {
      return new Response(JSON.stringify({ error: 'Tidak ada berkas yang diunggah' }), { status: 400 });
    }

    // Load profile data (contains favicon/og/profile pic URLs)
    const profilePath = path.resolve('src/data/profile.json');
    const profile = JSON.parse(fs.readFileSync(profilePath, 'utf-8'));

    const responseData: any = { success: true };

    // --- Existing assets ----------------------------------------------------
    if (faviconFile) {
      const url = await saveFile(faviconFile, ['.ico', '.png', '.jpg', '.jpeg', '.svg', '.gif'], 'favicon');
      deleteOldImage(profile.faviconUrl, 'favicon');
      profile.faviconUrl = url;
      responseData.faviconUrl = url;
    }

    if (ogImageFile) {
      const url = await saveFile(ogImageFile, ['.png', '.jpg', '.jpeg', '.webp'], 'og-image');
      deleteOldImage(profile.ogImageUrl, 'og-image');
      profile.ogImageUrl = url;
      responseData.ogImageUrl = url;
    }

    if (profileImageFile) {
      const url = await saveFile(profileImageFile, ['.png', '.jpg', '.jpeg', '.webp', '.gif'], 'profile-photo');
      deleteOldImage(profile.profileImage, 'profile-photo');
      profile.profileImage = url;
      responseData.profileImage = url;
    }

    // --- New entities ------------------------------------------------------
    // Helper to update JSON array files
    const updateJsonArray = async (
      filePath: string,
      id: string | null,
      imageUrl: string,
      prefix: string,
      responseKey: string,
    ) => {
      if (!id) return;
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as any[];
      const idx = data.findIndex(item => item.id === id);
      if (idx === -1) return;
      const oldImg = data[idx].image as string | undefined;
      data[idx].image = imageUrl;
      deleteOldImage(oldImg, prefix);
      try { fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8'); } catch (e) {}
      await uploadToGithub(`src/data/${path.basename(filePath)}`, JSON.stringify(data, null, 2), `Update ${path.basename(filePath)} with new image`);
      responseData[responseKey] = imageUrl;
    };

    if (projectImageFile && projectId) {
      const projectsPath = path.resolve('src/data/projects.json');
      const url = await saveFile(projectImageFile, ['.png', '.jpg', '.jpeg', '.webp', '.gif'], 'project-image');
      await updateJsonArray(projectsPath, projectId, url, 'project-image', 'projectImageUrl');
    }

    if (blogImageFile) {
      const url = await saveFile(blogImageFile, ['.png', '.jpg', '.jpeg', '.webp', '.gif'], 'blog-image');
      if (blogId) {
        const blogsPath = path.resolve('src/data/blogs.json');
        await updateJsonArray(blogsPath, blogId, url, 'blog-image', 'blogImageUrl');
      } else {
        responseData.blogImageUrl = url;
      }
    }

    if (certificateImageFile && certificateId) {
      const certsPath = path.resolve('src/data/certificates.json');
      const url = await saveFile(certificateImageFile, ['.png', '.jpg', '.jpeg', '.webp', '.gif'], 'certificate-image');
      await updateJsonArray(certsPath, certificateId, url, 'certificate-image', 'certificateImageUrl');
    }

    if (publicationImageFile && publicationId) {
      const pubsPath = path.resolve('src/data/publications.json');
      const url = await saveFile(publicationImageFile, ['.png', '.jpg', '.jpeg', '.webp', '.gif'], 'publication-image');
      await updateJsonArray(pubsPath, publicationId, url, 'publication-image', 'publicationImageUrl');
    }

    if (skillImageFile && skillId) {
      const skillsPath = path.resolve('src/data/skills.json');
      const url = await saveFile(skillImageFile, ['.png', '.jpg', '.jpeg', '.webp', '.gif'], 'skill-image');
      await updateJsonArray(skillsPath, skillId, url, 'skill-image', 'skillImageUrl');
    }

    if (educationImageFile && educationId) {
      const educationPath = path.resolve('src/data/education.json');
      // The API field in education.ts is "logo" instead of "image", so we handle it manually here
      const data = JSON.parse(fs.readFileSync(educationPath, 'utf-8')) as any[];
      const idx = data.findIndex(item => item.id === educationId);
      if (idx !== -1) {
        const url = await saveFile(educationImageFile, ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'], 'education-logo');
        const oldImg = data[idx].logo as string | undefined;
        data[idx].logo = url;
        deleteOldImage(oldImg, 'education-logo');
        try { fs.writeFileSync(educationPath, JSON.stringify(data, null, 2), 'utf-8'); } catch (e) {}
        await uploadToGithub('src/data/education.json', JSON.stringify(data, null, 2), 'Update education logo');
        responseData.educationImageUrl = url;
      }
    }

    if (editorImageFile) {
      const url = await saveFile(editorImageFile, ['.png', '.jpg', '.jpeg', '.webp', '.gif'], 'blog-content-image');
      responseData.editorImageUrl = url;
    }

    // Persist profile changes
    try { fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2), 'utf-8'); } catch (e) {}
    if (faviconFile || ogImageFile || profileImageFile) {
        await uploadToGithub('src/data/profile.json', JSON.stringify(profile, null, 2), 'Update profile images');
    }
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
