import { defineConfig } from 'astro/config';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // Asegúrate de tener esto o elimínalo si usa el valor por defecto, pero ponlo explícito para evitar confusiones.
  output: 'static',

  adapter: netlify()
});