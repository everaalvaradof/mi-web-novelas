import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://novelasligeras.netlify.app',
  output: 'server',
  adapter: netlify({
    // Forzamos a que el bundle de la función sea lean (ligero) y no empaquete de más
    imageCDN: false
  }),
  integrations: [sitemap()],
});