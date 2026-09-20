// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';
import { novelas } from '../data/novelas.js';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ? site.toString().replace(/\/$/, '') : 'https://novelasligeras.vercel.app';

  // 1. Página principal (Home)
  const staticPages = [
    '',
  ];

  // 2. URLs de las novelas con la estructura exacta: /ver/01, /ver/02, etc.
  const novelasUrls = novelas.map(novela => `/ver/${novela.id}`);

  const allRoutes = [...staticPages, ...novelasUrls];

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(route => {
      const url = `${baseUrl}${route}`;
      const isHome = route === '';
      return `
    <url>
        <loc>${url}</loc>
        <changefreq>${isHome ? 'daily' : 'weekly'}</changefreq>
        <priority>${isHome ? '1.0' : '0.8'}</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  return new Response(sitemapXML.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};