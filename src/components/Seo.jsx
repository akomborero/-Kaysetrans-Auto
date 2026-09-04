import { Helmet } from 'react-helmet-async';

export default function Seo({ title, description, image, url, type = 'website', schema }) {
  const siteName = 'Kaysetrans Auto';
  const safeTitle = title ? `${title} | ${siteName}` : `${siteName} — Quality Vehicles in Zimbabwe`;
  const safeDesc = description || 'Kaysetrans Auto — Quality pre-owned and new vehicles in Zimbabwe.';
  const safeImage = image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200';

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{safeTitle}</title>
      <meta name="description" content={safeDesc} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDesc} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={safeImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={safeDesc} />
      <meta name="twitter:image" content={safeImage} />

      {/* Canonical URL */}
      {url && <link rel="canonical" href={url} />}

      {/* Structured Data / Schema.org */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}