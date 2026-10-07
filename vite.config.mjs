import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const criticalCssPath = resolve(import.meta.dirname, 'styles/index.css');

// Inlines styles/index.css into <head> (dev and build) so the loading screen
// paints before any JS or external stylesheet has arrived.
function inlineCriticalCss() {
  return {
    name: 'inline-critical-css',
    transformIndexHtml() {
      return [
        {
          tag: 'style',
          children: readFileSync(criticalCssPath, 'utf-8'),
          injectTo: 'head',
        },
      ];
    },
    // The file is no longer part of the module graph, so reload on edits.
    handleHotUpdate({ file, server }) {
      if (file === criticalCssPath) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), inlineCriticalCss()],
  build: {
    // Keeps min-width/max-width media queries instead of the newer range syntax (width >= 600px),
    // which iOS Safari before 16.4 does not understand.
    cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14']
  }
});
