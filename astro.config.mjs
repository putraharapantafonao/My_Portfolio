// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  outDir: './my_server_build',
  server: {
    port: 4322,
    host: true
  },
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  }
});