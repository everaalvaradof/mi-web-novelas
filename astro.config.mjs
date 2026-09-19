import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static', // Esto le dice a Astro que genere HTMLs puros, NO funciones de servidor.
});