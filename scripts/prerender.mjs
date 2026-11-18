// Build-time prerendering for public Kaysetrans Auto pages.
//
// Renders the existing React app with genuine data from the live inventory API,
// writes static HTML for every public route, generates a sitemap from the same
// data, and embeds measurement tags only when real IDs are supplied via env.
// Admin/private routes are deliberately excluded.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const SITE_URL = 'https://www.kaysetransauto.co.zw';
const API_BASE_URL = (process.env.API_BASE_URL || 'https://smart-ar-backend.onrender.com').replace(/\/+$/, '');
const STATIC_ROUTES = ['/', '/cars', '/about', '/news', '/sell'];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Prevent embedded JSON from terminating the <script> element.
function safeJson(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

function validId(id) {
  const numeric = Number(id);
  return Number.isInteger(numeric) && numeric > 0;
}

function lastmodFrom(timestamp) {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
}

async function fetchVehicles() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cars`, {
      signal: AbortSignal.timeout(15000),
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`API returned ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('API did not return an array');

    return data.filter((car) => validId(car.id));
  } catch (error) {
    console.warn(`[prerender] Inventory unavailable (${error.message}); building without vehicle pages.`);
    return [];
  }
}

function measurementTags() {
  const gsc = process.env.GSC_VERIFICATION_TOKEN;
  const ga4 = process.env.GA4_MEASUREMENT_ID;
  let tags = '';

  if (gsc && /^[A-Za-z0-9_-]+$/.test(gsc)) {
    tags += `  <meta name="google-site-verification" content="${escapeXml(gsc)}" />\n`;
  } else if (gsc) {
    console.warn('[prerender] Ignoring invalid GSC_VERIFICATION_TOKEN.');
  }

  if (ga4 && /^G-[A-Za-z0-9]+$/.test(ga4)) {
    tags += `  <script async src="https://www.googletagmanager.com/gtag/js?id=${escapeXml(ga4)}"></script>\n`;
    tags += `  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${escapeXml(ga4)}');</script>\n`;
  } else if (ga4) {
    console.warn('[prerender] Ignoring invalid GA4_MEASUREMENT_ID (expected G-XXXXXXXXXX).');
  }

  return tags;
}

function buildSitemap(vehicles) {
  const vehicleLastmod = vehicles
    .map((car) => lastmodFrom(car.created_at))
    .filter(Boolean)
    .sort()
    .pop() || null;

  const entries = STATIC_ROUTES.map((route) => {
    const useInventoryDate = route === '/' || route === '/cars';
    const lastmod = useInventoryDate ? vehicleLastmod : null;
    return `  <url>\n    <loc>${escapeXml(`${SITE_URL}${route}`)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
  });

  for (const car of vehicles) {
    const lastmod = lastmodFrom(car.created_at);
    entries.push(
      `  <url>\n    <loc>${escapeXml(`${SITE_URL}/cars/${car.id}`)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`,
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
}

async function writeRoute(template, renderRoute, route, data, measurement) {
  const { html, head } = renderRoute(route, data);
  const payload = safeJson(data);

  const document = template
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, '')
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace(
      '</head>',
      `  ${head.title}\n  ${head.meta}\n  ${head.link}\n  ${head.script}\n${measurement}</head>`,
    )
    .replace('</body>', `  <script>window.__PRERENDER_DATA__=${payload};</script>\n  </body>`);

  const target = route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.replace(/^\//, ''), 'index.html');

  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, document, 'utf8');
  return target;
}

async function main() {
  await fs.access(distDir);
  await fs.access(ssrEntry);

  const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
  const { renderRoute } = await import(pathToFileURL(ssrEntry).href);
  const vehicles = await fetchVehicles();
  const measurement = measurementTags();

  console.log(`[prerender] ${vehicles.length} genuine vehicle(s) from ${API_BASE_URL}/api/cars`);

  for (const route of STATIC_ROUTES) {
    const data = route === '/' || route === '/cars' ? { cars: vehicles } : {};
    const target = await writeRoute(template, renderRoute, route, data, measurement);
    console.log(`[prerender] ${route} -> ${path.relative(root, target)}`);
  }

  for (const car of vehicles) {
    const route = `/cars/${car.id}`;
    const target = await writeRoute(template, renderRoute, route, { car }, measurement);
    console.log(`[prerender] ${route} -> ${path.relative(root, target)}`);
  }

  const sitemap = buildSitemap(vehicles);
  await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`[prerender] sitemap.xml -> ${STATIC_ROUTES.length + vehicles.length} URLs`);
}

main().catch((error) => {
  console.error('[prerender] FAILED:', error);
  process.exitCode = 1;
});
