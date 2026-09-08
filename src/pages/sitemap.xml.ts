import type { APIRoute } from 'astro';
import { novelas } from '../data/novelas.js';

export const GET: APIRoute = async () => {
    // Dominio base de tu web en producción
    const baseUrl = 'https://novelasligeras.netlify.app';

    // 1. Páginas principales estáticas
    const paginasEstaticas = [
        '',
        '/search',
    ];

    // 2. Extraer géneros únicos de tus novelas para incluir sus rutas si las usas
    const generosSet = new Set<string>();
    novelas.forEach(n => {
        if (n.genero) {
            n.genero.split(',').forEach(g => {
                const limpio = g.trim().toLowerCase();
                if (limpio) generosSet.add(limpio);
            });
        }
    });

    // 3. Armar el XML de forma limpia
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Páginas principales -->
    ${paginasEstaticas.map(ruta => `
    <url>
        <loc>${baseUrl}${ruta}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>`).join('')}

    <!-- Páginas principales de cada Novela (/ver/[id]) -->
    ${novelas.map(n => `
    <url>
        <loc>${baseUrl}/ver/${n.id}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`).join('')}
</urlset>`;

    return new Response(xml.trim(), {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8'
        }
    });
};