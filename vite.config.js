import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5182,
    strictPort: false,
    proxy: {
      '/api': 'http://localhost:3040',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
