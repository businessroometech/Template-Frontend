import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),  // This alias is fine, keeps your imports clean
    },
  },
  server: {
    port: 5173, // You can customize this if needed
  },
  build: {
    outDir: 'dist', // Ensures the output directory is correct
  }
})
