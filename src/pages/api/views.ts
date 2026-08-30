import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';

// Initialize Redis. Use mock if env vars are missing (e.g., local development without env)
let redis: Redis | null = null;
if (import.meta.env.KV_REST_API_URL && import.meta.env.KV_REST_API_TOKEN) {
  redis = new Redis({
    url: import.meta.env.KV_REST_API_URL,
    token: import.meta.env.KV_REST_API_TOKEN,
  });
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug parameter is required' }), { status: 400 });
  }

  if (!redis) {
    return new Response(JSON.stringify({ views: 0 }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const views = await redis.get<number>(`views:${slug}`) || 0;
    return new Response(JSON.stringify({ views }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Redis error:', error);
    return new Response(JSON.stringify({ views: 0 }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const slug = body.slug;

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug is required' }), { status: 400 });
    }

    if (!redis) {
      return new Response(JSON.stringify({ views: 1 }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Increment view count
    const views = await redis.incr(`views:${slug}`);

    return new Response(JSON.stringify({ views }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Redis increment error:', error);
    return new Response(JSON.stringify({ views: 0 }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
};
