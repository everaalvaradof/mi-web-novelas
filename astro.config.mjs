import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://novelasligeras.netlify.app',
  output: 'server',
  // Esto hace que el adaptador de Netlify solo actúe al compilar, 
  // evitando que joda con las Edge Functions en tu localhost.
  adapter: process.env.NODE_ENV === 'production' ? netlify({ imageCDN: false }) : undefined,
});