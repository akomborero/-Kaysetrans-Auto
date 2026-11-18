# SEO growth implementation — deployment and configuration

## Build

`npm run build` runs:

1. `vite build` — client bundle into `dist/`.
2. `vite build --ssr src/entry-server.jsx --outDir dist-ssr` — build-only SSR bundle.
3. `node scripts/prerender.mjs` — static HTML, sitemap, measurement tags.

`dist/` is the Vercel output directory. `dist-ssr/` is gitignored.

## Canonical host

`https://www.kaysetransauto.co.zw` is the single canonical host. The apex domain
308-redirects to www, so `Seo.jsx`, `robots.txt`, `sitemap.xml` and every
generated canonical/OG URL use `www` and resolve directly with HTTP 200.

## Prerendered routes and indexing

Public routes: `/`, `/cars`, `/cars/:id`, `/about`, `/news`, `/sell`.
Every one has exactly one `<title>`, one meta description, one canonical and
`index, follow`. Verified in the generated HTML.

`/admin/inventory` is generated as a minimal SPA shell with
`<meta name="robots" content="noindex, nofollow">` and no title/description/
canonical. `robots.txt` also disallows `/admin/`. No rewrite is needed.

`vercel.json` contains no catch-all rewrite: existing vehicle URLs are served
from `dist/cars/<id>/index.html` (200); unknown/removed vehicle IDs have no file
and return a genuine 404.

## Vehicle SEO

`src/utils/seoData.js` builds all vehicle SEO values from real API fields only:

- Title: `<year> <make> <model> for Sale in Harare, Zimbabwe | Kaysetrans Auto`.
  Missing fields are omitted rather than invented.
- Description: real price, mileage, transmission, fuel and the supplied
  description, with a contact call to action.
- Canonical: `/cars/:id` on the www host.
- Open Graph image: the vehicle's real primary `car_images[].image_url`.
- Image alt text: year/make/model for the hero image and numbered gallery images.
- BreadcrumbList + Vehicle/Offer JSON-LD: only when a real price and real
  `status: available` exist. No condition, warranty, rating or review claims.

Only vehicles whose `status` is exactly `available` are prerendered, passed to
the home/list pages and included in `sitemap.xml`. Reserved and sold vehicles
are excluded. The prerender script deletes the previous `dist/cars/` directory
before writing, so a removed vehicle's old page cannot survive a deployment.

`lastmod` uses the real `created_at` from the API. Static pages omit `lastmod`
unless inventory changed (`/` and `/cars` then use the latest real vehicle date).

## Structured data

- `AutomotiveBusiness` — Home and About, using only the verified name, phone,
  email and street address already published in the footer.
- `WebSite` — Home and About (no SearchAction: there is no server-readable
  search URL).
- `BreadcrumbList` — `/cars`, `/cars/:id`, `/about`, `/news`, `/sell`, with
  matching visible breadcrumbs.
- `Vehicle` + `Offer` — vehicle pages with real price, currency USD, mileage
  (unitCode KMT), images and `InStock` availability derived from real status.

Multiple schemas are emitted as one valid `@graph`. All JSON-LD was parsed and
validated locally after build; final validation in Google's Rich Results Test
and the Schema Markup Validator must be done after deployment.

## Local SEO

No opening hours, coordinates, branches, social profiles or Google Business
Profile details were added because none were supplied. The existing NAP (phone,
email, address in `Footer.jsx`) is used consistently. These are still needed
before GBP integration: business hours, geo coordinates, official social URLs,
GBP listing URL. Supply them later; nothing was invented.

## No new pages

Per instruction, no contact page, make/model landing pages, category pages or
new articles were created. Internal linking was improved on existing pages via
breadcrumbs and existing inventory/enquiry links. Content was limited to unique,
factual copy on `/cars` and vehicle pages. The footer credit
"Designed & Developed by Makomborero Chidziva" is preserved unchanged.

## Google Search Console — connection instructions

1. Ensure the site is deployed and `https://www.kaysetransauto.co.zw/` loads.
2. In Search Console, add a **Domain property** for `kaysetransauto.co.zw`
   (covers apex and www). If only a URL-prefix property is possible, use the
   `https://www.kaysetransauto.co.zw/` variant.
3. Choose a verification method. For HTML-tag verification, copy the exact
   token Google gives you and set it as the Vercel environment variable
   `GSC_VERIFICATION_TOKEN`, then redeploy. The build writes
   `<meta name="google-site-verification" content="…">` into every generated
   page. Alternative: DNS verification needs no site change.
4. Click **Verify** in Search Console.
5. Open **Sitemaps**, enter `sitemap.xml`, and submit. Confirm the 5 static URLs
   plus one URL per active vehicle.
6. Use **URL Inspection** on `/`, `/cars` and one vehicle page; request indexing.
7. Check **Pages → Excluded** for `noindex` or 404 entries and **Indexing →
   Breadcrumbs/Products/Vehicles** reports after a few days.

No verification token is stored in this repository.

## Measurement configuration

| Variable | Expected format | Emitted tag |
|---|---|---|
| `GSC_VERIFICATION_TOKEN` | token from Search Console | `google-site-verification` meta on every generated page |
| `GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | gtag.js loader + config on every generated page |
| `API_BASE_URL` (optional) | backend origin, default `https://smart-ar-backend.onrender.com` | used only by the prerender script |

Set them as Vercel Environment Variables (Project → Settings → Environment
Variables) and redeploy. Leave unset to omit tags. Invalid values are ignored
with a build warning.

## Verification checklist

```bash
npm run build
npx eslint src/utils/seoData.js src/entry-server.jsx scripts/prerender.mjs
```

Then inspect `dist/`:

- Public HTML: exactly one title/description/canonical/robots tag, no `noindex`.
- Vehicle HTML: real make/model/year/price, descriptive alts, breadcrumbs,
  vehicle-specific OG image, valid Vehicle + Offer + BreadcrumbList JSON-LD.
- `sitemap.xml`: 5 static URLs + active vehicles only; valid when empty.
- `admin/inventory/index.html`: `noindex, nofollow`, no canonical.
- No stale vehicle files after a rebuild where a vehicle becomes unavailable.

After deployment: `curl -I .../cars/<valid-id>` → 200; unknown id → 404.

## Remaining limitations

- Inventory freshness for crawlers still requires a rebuild/redeploy.
- News content remains third-party and client-fetched.
- No make/model landing pages, buying guides or contact page (per instruction).
- GBP and consent/analytics configuration remain external to this repository.
- Rich Results Test / Schema Markup Validator checks require the deployed URLs.
