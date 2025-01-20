import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    sourcemap: false, // Disable source maps to reduce memory usage during the build
    outDir: 'dist', // Output directory for the built files
    chunkSizeWarningLimit: 1000, // Avoid chunk size warnings
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  server: {
    port: 3000, // Set the dev server port
    strictPort: true, // Ensure the port is not randomly changed
    open: true, // Open browser on server start
  },
});
