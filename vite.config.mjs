import { defineConfig } from 'vite';

// React 15 has no automatic JSX runtime, so JSX is compiled to React.createElement calls
// (every component already imports React) and @vitejs/plugin-react is not used.
export default defineConfig({
  build: {
    // Keeps min-width/max-width media queries instead of the newer range syntax (width >= 600px),
    // which iOS Safari before 16.4 does not understand.
    cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14']
  },
  oxc: {
    jsx: {
      runtime: 'classic'
    }
  }
});
