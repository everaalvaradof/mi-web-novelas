import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://novelasligeras.netlify.app',
  output: 'static', // 100% estático para que no se genere ninguna función SSR pesada
  integrations: [sitemap()],
});