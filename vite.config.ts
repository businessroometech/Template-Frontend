import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // React plugin options
      jsxImportSource: "@emotion/react", // Example: Add Emotion for styling (optional)
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Alias for the `src` directory
      components: resolve(__dirname, 'src/components'), // Example: Alias for components
      utils: resolve(__dirname, 'src/utils'), // Example: Alias for utilities
    },
  },
  build: {
    sourcemap: true, // Enable source maps for easier debugging
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'], // Separate React libraries into their own chunk
        },
      },
    },
    chunkSizeWarningLimit: 500, // Adjust chunk size warning limit (default is 500KB)
  }
  // server: {
  //   port: 3000, // Specify the development server port
  //   open: true, // Automatically open the browser on server start
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5000', // Proxy API requests to the backend server
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});
