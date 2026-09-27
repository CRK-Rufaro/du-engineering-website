import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const PORT = 4173;

// All routes from sitemap.xml
const ROUTES = [
  '/',
  '/projects',
  '/quote',
  '/projects/klerksdorp-residence-8kw',
  '/projects/midrand-office-complex',
  '/projects/pretoria-home-6kw',
  '/projects/johannesburg-retail-store',
  '/projects/randburg-family-home',
  '/projects/centurion-business-park',
  '/brands',
  '/about',
];

// Block these domains during prerendering (tracking scripts keep connections open)
const BLOCKED_DOMAINS = [
  'googletagmanager.com',
  'google-analytics.com',
  'googleanalytics.com',
  'facebook.net',
  'hotjar.com',
];

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://localhost:${PORT}`);
      let filePath = path.join(DIST, url.pathname);

      // Try exact file match first
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        // Serve the file directly
      } else if (fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
      } else {
        // SPA fallback - serve index.html for all routes
        filePath = path.join(DIST, 'index.html');
      }

      const ext = path.extname(filePath);
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      try {
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(PORT, () => {
      console.log(`  Static server on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

// Remove hardcoded SEO tags that are duplicated by react-helmet-async (data-rh="true").
// Keeps the data-rh versions which have correct per-page content.
function cleanDuplicateMeta(html) {
  // These attributes identify tags managed by react-helmet-async
  const managedAttrs = [
    'name="description"',
    'rel="canonical"',
    'property="og:title"',
    'property="og:description"',
    'property="og:url"',
    'property="og:image"',
    'name="twitter:title"',
    'name="twitter:description"',
    'name="twitter:image"',
  ];

  const lines = html.split('\n');
  const result = [];

  for (const line of lines) {
    const trimmed = line.trim();
    const isManagedTag = managedAttrs.some((attr) => trimmed.includes(attr));
    const hasDataRh = trimmed.includes('data-rh=');

    if (isManagedTag && !hasDataRh) {
      // Hardcoded tag that has a data-rh equivalent — remove it
      continue;
    }

    result.push(line);
  }

  return result.join('\n');
}

async function prerender() {
  console.log('\nPrerendering pages for SEO...\n');

  const server = await startServer();
  const browser = await puppeteer.launch({ headless: true });
  let rendered = 0;

  for (const route of ROUTES) {
    try {
      const page = await browser.newPage();

      // Block analytics/tracking scripts that keep connections alive
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const url = req.url();
        if (BLOCKED_DOMAINS.some((domain) => url.includes(domain))) {
          req.abort();
        } else {
          req.continue();
        }
      });

      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Wait for React to render content inside #root
      await page.waitForSelector('#root > *', { timeout: 10000 });

      // Small delay for react-helmet-async to update <head> tags
      await new Promise((r) => setTimeout(r, 500));

      let html = await page.content();

      // Add a marker so main.jsx knows this is prerendered
      html = html.replace(
        '<div id="root">',
        '<div id="root" data-prerendered="true">'
      );

      // Clean duplicate meta tags: index.html has hardcoded SEO tags,
      // react-helmet-async adds per-page versions with data-rh="true".
      // Remove the hardcoded duplicates so Google sees only the correct per-page tags.
      html = cleanDuplicateMeta(html);

      // Determine output path
      const outputDir = route === '/' ? DIST : path.join(DIST, route);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const outputPath = path.join(outputDir, 'index.html');
      fs.writeFileSync(outputPath, html);

      const title = await page.title();
      console.log(`  OK  ${route} -> "${title}"`);
      rendered++;

      await page.close();
    } catch (err) {
      console.error(`  FAIL  ${route} -> ${err.message}`);
    }
  }

  await browser.close();
  server.close();

  console.log(`\nPrerender complete: ${rendered}/${ROUTES.length} pages\n`);

  if (rendered < ROUTES.length) {
    console.error('Some pages failed to prerender. Check errors above.');
    process.exit(1);
  }
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
