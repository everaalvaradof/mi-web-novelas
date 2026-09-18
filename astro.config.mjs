import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://novelasligeras.netlify.app',
  output: 'server',
  adapter: process.env.NODE_ENV === 'production' ? netlify({ 
    imageCDN: false,
    // Aquí le decimos que ignore la carpeta de datos y capítulos para que la función no pese gigabytes
    includeFiles: ['./src/data/novelas.js'] 
  }) : undefined,
  integrations: [sitemap()],
});