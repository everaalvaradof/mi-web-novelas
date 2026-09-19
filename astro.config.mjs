import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server', // O 'hybrid' si combinas páginas estáticas y dinámicas
  adapter: vercel(),
});