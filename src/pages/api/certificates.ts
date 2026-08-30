import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { isAuthenticated } from '../../utils/auth';

const filePath = path.resolve('src/data/certificates.json');

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
    const newItem = {
      id: Date.now().toString(),
      title: body.title || '',
      title_en: body.title_en || '',
      issuer: body.issuer || '',
      issueDate: body.issueDate || '',
      expirationDate: body.expirationDate || 'Tidak Ada Kedaluwarsa',
      expirationDate_en: body.expirationDate_en || 'No Expiration Date',
      credentialId: body.credentialId || '',
      verifyUrl: body.verifyUrl || '',
      icon: body.icon || 'fas fa-award'
    };
    data.push(newItem);
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
      return new Response(JSON.stringify({ error: 'Certificate not found' }), { status: 404 });
    }
    data[index] = {
      ...data[index],
      title: body.title !== undefined ? body.title : data[index].title,
      title_en: body.title_en !== undefined ? body.title_en : data[index].title_en,
      issuer: body.issuer !== undefined ? body.issuer : data[index].issuer,
      issueDate: body.issueDate !== undefined ? body.issueDate : data[index].issueDate,
      expirationDate: body.expirationDate !== undefined ? body.expirationDate : data[index].expirationDate,
      expirationDate_en: body.expirationDate_en !== undefined ? body.expirationDate_en : data[index].expirationDate_en,
      credentialId: body.credentialId !== undefined ? body.credentialId : data[index].credentialId,
      verifyUrl: body.verifyUrl !== undefined ? body.verifyUrl : data[index].verifyUrl,
      icon: body.icon !== undefined ? body.icon : data[index].icon
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
