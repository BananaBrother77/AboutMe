import { resolve, basename } from 'path';
import { defineConfig } from 'vite';
import ejs from 'ejs';
import { cloudflare } from '@cloudflare/vite-plugin';

const partialsDir = resolve(import.meta.dirname, 'partials');

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
