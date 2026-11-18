import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Kaysetrans Auto';
// The live host is www.kaysetransauto.co.zw (apex 308-redirects to www).
// Canonical urls must point at the final, directly-resolving host.
const SITE_URL = 'https://www.kaysetransauto.co.zw';

// Canonical and og:url values must be absolute. Existing pages pass relative paths.
const toAbsoluteUrl = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

// Page titles already contain the site name in a number of places. Normalise
// first so we never emit "… — Kaysetrans Auto | Kaysetrans Auto".
const toPageTitle = (title) => {
  if (!title) return `${SITE_NAME} — Quality Vehicles in Zimbabwe`;

  const cleaned = title
    .replace(/(?:\s+[|—–-]\s*)Kaysetrans\s+Auto\s*$/i, '')
    .replace(/^Kaysetrans\s+Auto\s*[|—–-]\s*/i, '')
    .replace(/^Kaysetrans\s+Auto$/i, '')
    .trim();

  return cleaned ? `${cleaned} | ${SITE_NAME}` : `${SITE_NAME} — Quality Vehicles in Zimbabwe`;
};

export default function Seo({ title, description, image, url, type = 'website', schema }) {
  const safeTitle = toPageTitle(title);
  const safeDesc = description || 'Kaysetrans Auto — Quality pre-owned and new vehicles in Zimbabwe.';
  const safeImage = image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200';
  const absoluteUrl = toAbsoluteUrl(url);

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{safeTitle}</title>
      <meta name="description" content={safeDesc} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDesc} />
      <meta property="og:type" content={type} />
      {absoluteUrl && <meta property="og:url" content={absoluteUrl} />}
      <meta property="og:image" content={safeImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={safeDesc} />
      <meta name="twitter:image" content={safeImage} />

      {/* Canonical URL */}
      {absoluteUrl && <link rel="canonical" href={absoluteUrl} />}

      {/* Structured Data / Schema.org */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
