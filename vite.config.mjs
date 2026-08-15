import { resolve, basename } from 'path';
import { readFileSync, existsSync } from 'fs';
import { defineConfig } from 'vite';
import ejs from 'ejs';
import { cloudflare } from '@cloudflare/vite-plugin';

const partialsDir = resolve(import.meta.dirname, 'partials');
const notFoundPath = resolve(import.meta.dirname, '404.html');

function render404() {
  const html = readFileSync(notFoundPath, 'utf8');
  return ejs.render(html, { page: '404' }, { views: [partialsDir] });
}

export default defineConfig({
  plugins: [
    {
      name: 'html-includes',
      transformIndexHtml: {
        order: 'pre',
        handler: (html, ctx) => {
          const page = basename(ctx.filename || '').replace('.html', '');
          return ejs.render(html, { page }, { views: [partialsDir] });
        },
      },
    },
    {
      name: 'serve-404-dev',
      configureServer(server) {
        const root = server.config.root;
        server.middlewares.use((req, res, next) => {
          if (req.method !== 'GET') return next();
          if (!req.headers.accept?.includes('text/html')) return next();

          const pathname = decodeURIComponent((req.url || '').split('?')[0]);
          if (pathname === '/' || pathname === '') return next();

          const candidates = [pathname, `${pathname}.html`, `${pathname}/index.html`];
          const exists = candidates.some((c) =>
            existsSync(resolve(root, c.slice(1))),
          );
          if (exists) return next();

          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(render404());
        });
      },
    },
    cloudflare(),
  ],
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        feedback: resolve(import.meta.dirname, 'feedback.html'),
        terms: resolve(import.meta.dirname, 'terms.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        'terms-de': resolve(import.meta.dirname, 'terms-de.html'),
        'privacy-de': resolve(import.meta.dirname, 'privacy-de.html'),
        404: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
  server: {
    host: '0.0.0.0',
  },
});
