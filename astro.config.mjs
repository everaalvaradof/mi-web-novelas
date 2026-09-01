import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap'; // <--- 1. Importas el sitemap

export default defineConfig({
  site: 'https://novelasligeras.netlify.app',
  output: 'server',
  adapter: process.env.NODE_ENV === 'production' ? netlify({ imageCDN: false }) : undefined,
  integrations: [sitemap()], // <--- 2. Lo agregas aquí en las integraciones
});