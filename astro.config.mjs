import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://novelasligeras.netlify.app',
  output: 'server',
  adapter: netlify({
    imageCDN: false
  }),
});