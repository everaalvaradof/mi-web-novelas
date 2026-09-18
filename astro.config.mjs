import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://novelasligeras.netlify.app',
  output: 'static', // <--- Cambiado a estático para evitar funciones pesadas
  integrations: [sitemap()],
});