import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Keeps min-width/max-width media queries instead of the newer range syntax (width >= 600px),
    // which iOS Safari before 16.4 does not understand.
    cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14']
  }
});
