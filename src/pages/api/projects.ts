import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { uploadToGithub } from '../../utils/github';
import { isAuthenticated } from '../../utils/auth';

const filePath = path.resolve('src/data/projects.json');

function readData() {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

async function writeData(data: any) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  try { fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8'); } catch (e) {}
  await uploadToGithub('src/data/projects.json', JSON.stringify(data, null, 2), 'Update projects.json');
}

export const GET: APIRoute = async () => {
  try {
    const data = readData();
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
    const data = readData();
    const newItem = {
      id: Date.now().toString(),
      title: body.title || '',
      title_en: body.title_en || '',
      description: body.description || '',
      description_en: body.description_en || '',
      image: body.image || '',
      fallbackImg: body.fallbackImg || 'https://placehold.co/600x400/020617/818cf8?text=Project',
      tags: Array.isArray(body.tags) ? body.tags : [],
      link: body.link || '#',
      demoUrl: body.demoUrl || '#',
      date: body.date || ''
    };
    data.push(newItem);
    await writeData(data);
    return new Response(JSON.stringify(newItem), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.id) {
      return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 });
    }
    const data = readData();
    const index = data.findIndex((item: any) => item.id === body.id);
    if (index === -1) {
      return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });
    }
    data[index] = {
      ...data[index],
      title: body.title !== undefined ? body.title : data[index].title,
      title_en: body.title_en !== undefined ? body.title_en : data[index].title_en,
      description: body.description !== undefined ? body.description : data[index].description,
      description_en: body.description_en !== undefined ? body.description_en : data[index].description_en,
      image: body.image !== undefined ? body.image : data[index].image,
      fallbackImg: body.fallbackImg !== undefined ? body.fallbackImg : data[index].fallbackImg,
      tags: Array.isArray(body.tags) ? body.tags : data[index].tags,
      link: body.link !== undefined ? body.link : data[index].link,
      demoUrl: body.demoUrl !== undefined ? body.demoUrl : data[index].demoUrl,
      date: body.date !== undefined ? body.date : data[index].date
    };
    await writeData(data);
    return new Response(JSON.stringify(data[index]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing id parameter' }), { status: 400 });
    }
    const data = readData();
    const filtered = data.filter((item: any) => item.id !== id);
    writeData(filtered);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
