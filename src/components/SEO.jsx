import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://duengineering.co.za';
const DEFAULT_IMAGE = `${SITE_URL}/due_engineering_logo.svg`;

function SEO({ title, description, path = '/', image, jsonLd }) {
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;
  const fullTitle = title
    ? `${title} | DUE Engineering`
    : 'DUE Engineering | Professional Solar & Electrical Solutions in Klerksdorp';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;
