import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { isAuthenticated } from '../../utils/auth';

const filePath = path.resolve('src/data/blogs.json');

function readData() {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeData(data: any) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
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
    const formattedDate = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const newItem = {
      id: Date.now().toString(),
      title: body.title || '',
      title_en: body.title_en || '',
      date: body.date || formattedDate,
      category: body.category || 'Backend',
      summary: body.summary || '',
      summary_en: body.summary_en || '',
      image: body.image || '',
      content: body.content || '',
      content_en: body.content_en || ''
    };
    data.unshift(newItem); // New blog posts appear first
    writeData(data);
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
      return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
    }
    data[index] = {
      ...data[index],
      title: body.title !== undefined ? body.title : data[index].title,
      title_en: body.title_en !== undefined ? body.title_en : data[index].title_en,
      date: body.date !== undefined ? body.date : data[index].date,
      category: body.category !== undefined ? body.category : data[index].category,
      summary: body.summary !== undefined ? body.summary : data[index].summary,
      summary_en: body.summary_en !== undefined ? body.summary_en : data[index].summary_en,
      image: body.image !== undefined ? body.image : data[index].image,
      content: body.content !== undefined ? body.content : data[index].content,
      content_en: body.content_en !== undefined ? body.content_en : data[index].content_en
    };
    writeData(data);
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
