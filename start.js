import { dev } from 'astro';

async function start() {
  try {
    console.log("Starting Astro dev server programmatically...");
    const server = await dev({
      root: '.',
      port: 4321
    });
    console.log("Astro dev server is running!");
  } catch (error) {
    console.error("Failed to start Astro dev server:", error);
  }
}

start();
