import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import indexnow from 'astro-indexnow';

export default defineConfig({
  site: 'https://novelasligeras.vercel.app',
  output: 'server',
  adapter: vercel(),
  integrations: [
    indexnow({
      host: 'novelasligeras.vercel.app',
      key: 'a739adb17do924676a7038bmi5mib7do703a',
      // Opcional: puedes listar tus URLs principales o dejar que el sitemap las envíe
      urlList: [
        'https://novelasligeras.vercel.app/',
        // Agrega aquí las URLs clave de tus estrenos o categorías si deseas forzarlas de una vez
      ]
    }),
  ],
});