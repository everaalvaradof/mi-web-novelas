import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const capitulos = defineCollection({
  // Asegúrate de que esta ruta base coincida con tu carpeta de capítulos
  loader: glob({ pattern: "**/*.md", base: "src/content/capitulos" }),
  schema: z.object({
    titulo: z.string(),
    numero: z.number(),
    novelaId: z.string(),
  }),
});

export const collections = { capitulos };