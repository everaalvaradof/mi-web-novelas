import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Cambiamos a server (o hybrid) para que use el adaptador de Netlify
  adapter: netlify(),
});