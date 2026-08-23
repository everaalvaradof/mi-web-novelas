import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tusitio.com', // ⚠️ Reemplaza esto con tu dominio real (ej. si usas Vercel o Netlify)
  integrations: [sitemap()],
});