import { novelas } from '../data/novelas.js';

export const prerender = true;

const formatSlug = (str: string) => str ? str.trim().toLowerCase().replace(/\s+/g, '-') : '';

export async function GET() {
    const baseUrl = 'https://novelasligeras.vercel.app';
    const pageSize = 10;

    const urls: string[] = [
        `${baseUrl}/`,
    ];

    // 1. Novelas individuales (detalle)
    novelas.forEach(n => {
        if (n.id) {
            urls.push(`${baseUrl}/ver/${n.id}`);
        }
    });

    // 2. Géneros y su paginación
    const generosMap: Record<string, number> = {};
    novelas.forEach(n => {
        if (n.genero) {
            n.genero.split(',').forEach(g => {
                const slug = formatSlug(g);
                if (slug) {
                    generosMap[slug] = (generosMap[slug] || 0) + 1;
                }
            });
        }
    });

    for (const [slug, count] of Object.entries(generosMap)) {
        const lastPage = Math.ceil(count / pageSize) || 1;
        for (let i = 1; i <= lastPage; i++) {
            urls.push(`${baseUrl}/genero/${slug}/${i}`);
        }
    }

    // 3. Países / Origen y su paginación
    const paisesMap: Record<string, number> = {};
    novelas.forEach(n => {
        if (n.pais) {
            n.pais.split(',').forEach(p => {
                const slug = formatSlug(p);
                if (slug) {
                    paisesMap[slug] = (paisesMap[slug] || 0) + 1;
                }
            });
        }
    });

    for (const [slug, count] of Object.entries(paisesMap)) {
        const lastPage = Math.ceil(count / pageSize) || 1;
        for (let i = 1; i <= lastPage; i++) {
            urls.push(`${baseUrl}/pais/${slug}/${i}`);
        }
    }

    // 4. Autores y su paginación
    const autoresMap: Record<string, number> = {};
    novelas.forEach(n => {
        if (n.autor) {
            const slug = formatSlug(n.autor);
            if (slug) {
                autoresMap[slug] = (autoresMap[slug] || 0) + 1;
            }
        }
    });

    for (const [slug, count] of Object.entries(autoresMap)) {
        const lastPage = Math.ceil(count / pageSize) || 1;
        for (let i = 1; i <= lastPage; i++) {
            urls.push(`${baseUrl}/autor/${slug}/${i}`);
        }
    }

    // 5. Categorías y su paginación
    const categoriasSet = new Set<string>(['estrenos', 'terminadas', 'emision', 'actualizadas']);
    novelas.forEach(n => {
        if (n.categoria) {
            const slug = formatSlug(n.categoria);
            if (slug) categoriasSet.add(slug);
        }
    });

    for (const cat of categoriasSet) {
        const catFiltradas = novelas.filter(n => {
            const c = formatSlug(n.categoria || n.estado || '');
            return c === cat;
        });
        const count = catFiltradas.length > 0 ? catFiltradas.length : 1;
        const lastPage = Math.ceil(count / pageSize) || 1;
        for (let i = 1; i <= lastPage; i++) {
            urls.push(`${baseUrl}/categoria/${cat}/${i}`);
        }
    }

    // Generar la estructura XML del sitemap
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(url => `
    <url>
        <loc>${url}</loc>
    endurl`).join('').replace(/endurl/g, '')}
</urlset>`;

    return new Response(sitemapXml.trim(), {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8'
        }
    });
}