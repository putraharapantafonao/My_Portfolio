import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { uploadToGithub } from '../../utils/github';
import { isAuthenticated } from '../../utils/auth';

const filePath = path.resolve('src/data/education.json');

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
  await uploadToGithub('src/data/education.json', JSON.stringify(data, null, 2), 'Update education.json');
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
      institution: body.institution || '',
      institution_en: body.institution_en || '',
      degree: body.degree || '',
      degree_en: body.degree_en || '',
      startYear: body.startYear || '',
      endYear: body.endYear || '',
      description: body.description || '',
      description_en: body.description_en || '',
      logo: body.logo || ''
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
      return new Response(JSON.stringify({ error: 'Education not found' }), { status: 404 });
    }
    data[index] = {
      ...data[index],
      institution: body.institution !== undefined ? body.institution : data[index].institution,
      institution_en: body.institution_en !== undefined ? body.institution_en : data[index].institution_en,
      degree: body.degree !== undefined ? body.degree : data[index].degree,
      degree_en: body.degree_en !== undefined ? body.degree_en : data[index].degree_en,
      startYear: body.startYear !== undefined ? body.startYear : data[index].startYear,
      endYear: body.endYear !== undefined ? body.endYear : data[index].endYear,
      description: body.description !== undefined ? body.description : data[index].description,
      description_en: body.description_en !== undefined ? body.description_en : data[index].description_en,
      logo: body.logo !== undefined ? body.logo : data[index].logo
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
