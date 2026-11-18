# SEO Phase 1 — deployment and configuration

## What this build does

`npm run build` now runs three steps:

1. `vite build` — normal client bundle into `dist/`.
2. `vite build --ssr src/entry-server.jsx --outDir dist-ssr` — a Node-renderable copy of the app.
3. `node scripts/prerender.mjs` — renders public routes to static HTML, generates `sitemap.xml`, and injects optional measurement tags.

`dist/` remains the Vercel output directory. `dist-ssr/` is build-only (already gitignored).

### Canonical host

`https://www.kaysetransauto.co.zw` is the single canonical host. The apex domain
308-redirects to www on Vercel, so `src/components/Seo.jsx`, `public/robots.txt`,
the baseline `public/sitemap.xml` and the generated `dist/sitemap.xml` all use
`www`. Every canonical URL points at a URL that resolves directly with HTTP 200.

### Prerendered routes

`/`, `/cars`, `/cars/:id` (one per genuine API vehicle), `/about`, `/news`, `/sell`.
`/admin/inventory` is intentionally **not** prerendered — it is handled by a
single rewrite in `vercel.json` back to the SPA shell.

Each generated HTML file contains:
- the page title, description, canonical, Open Graph and Twitter tags in `<head>`;
- the real page body, rendered from the existing React components;
- `window.__PRERENDER_DATA__` with the genuine API records used for that page, so
  the client's first render matches the HTML before the normal live fetch runs.

No vehicle page is generated from demo/cached data: `scripts/prerender.mjs` calls
`GET {API_BASE_URL}/api/cars` at build time and filters only rows with a valid
integer id. If that request fails, the build still succeeds with no vehicle
pages and a sitemap containing only the static URLs.

### HTTP status behaviour

`vercel.json` no longer rewrites everything to `index.html`. Existing vehicles
are served from `dist/cars/<id>/index.html` (HTTP 200). A nonexistent id has no
generated file, so Vercel returns a genuine HTTP 404 instead of a client-side
"not found" with status 200. Deleted vehicles disappear from the next build's
sitemap and have no generated page, so they also return 404.

### Inventory updates / freshness

**Current state (no backend changes made):** the public site still fetches live
inventory on every page load, so visitors see new or removed vehicles
immediately. However, the prerendered HTML and `sitemap.xml` are build artifacts:
they only change when the frontend is rebuilt and redeployed.

To refresh them after adding/removing vehicles, trigger a Vercel deploy. Options:
- Manual redeploy from the Vercel dashboard.
- A Vercel Deploy Hook URL called by a scheduled job.
- (Requires separate approval, backend not changed here) call that Deploy Hook
  from the backend after a successful create/delete.

No backend API, database or authentication behaviour was modified in this phase.

## Measurement configuration (values must be supplied by the owner)

No tokens or IDs were invented. `scripts/prerender.mjs` reads them from
environment variables at build time and emits tags only when a valid value is
present:

| Variable | Expected format | Emitted tag |
|---|---|---|
| `GSC_VERIFICATION_TOKEN` | token string provided by Google Search Console | `<meta name="google-site-verification" content="…">` in every generated page |
| `GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | GA4 gtag.js loader + config in every generated page |
| `API_BASE_URL` (optional) | backend origin, default `https://smart-ar-backend.onrender.com` | used only by the prerender script |

Supply these as Vercel **Environment Variables** (Project → Settings →
Environment Variables) and redeploy. Leave them unset to omit the tags. Invalid
`GA4_MEASUREMENT_ID` values are ignored with a build warning.

## Verification checklist

```bash
npm run build
npx eslint src/entry-server.jsx scripts/prerender.mjs
```

Then inspect `dist/`:

- `index.html`, `cars/index.html`, `about/index.html`, `news/index.html`,
  `sell/index.html`, `cars/<id>/index.html` all exist and contain `<title>`,
  `meta name="description"`, `rel="canonical"` and `og:title`.
- Vehicle HTML contains the real make, model, year, price, description and
  image URLs returned by `/api/cars`.
- `sitemap.xml` lists the five static pages plus one URL per genuine vehicle,
  with `lastmod` taken from each vehicle's real `created_at`.
- `robots.txt` declares the www sitemap URL and disallows `/admin/`.
- No `dist/admin/` directory exists; no `dist/cars/999999/` exists.
- After deployment: `curl -I https://www.kaysetransauto.co.zw/cars/<valid-id>`
  → 200, and an unknown id → 404.

## Remaining limitations (out of this phase's scope)

- Vehicle titles/descriptions are still assembled from an admin-entered string
  and do not include year, price or location (Phase 2 item).
- The default Open Graph image is still the shared stock image; vehicle pages do
  not yet use their primary vehicle image as `og:image`.
- Only `AutomotiveBusiness` structured data is present. `Vehicle`/`Offer`,
  breadcrumbs and FAQ markup were not added in this phase.
- The news pages still fetch third-party articles on the client, so their
  prerendered HTML shows the loading state until JavaScript runs.
- Inventory freshness for search engines still depends on a redeploy.
- GA4 and Search Console are not active until the environment variables above
  are supplied and GSC verification is completed in the Search Console UI.
