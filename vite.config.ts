import path from 'path'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(),],
  define: {
    'process.env': {}
  },
  base: '/cat-api/',
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  }
});
