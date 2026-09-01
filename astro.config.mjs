import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://novelasligeras.netlify.app', // ⚠️ Tu dominio real de Netlify que vi en la captura
  output: 'server', // <--- Esto activa el modo dinámico (SSR) para que no queme memoria compilando 6000+ archivos
  adapter: netlify(),
  integrations: [sitemap()],
});