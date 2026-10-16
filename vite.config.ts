import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-404-html',
      closeBundle() {
        const distHtml = path.resolve(import.meta.dirname, 'dist', 'index.html');
        const dist404 = path.resolve(import.meta.dirname, 'dist', '404.html');
        if (fs.existsSync(distHtml)) {
          fs.copyFileSync(distHtml, dist404);
        }
      }
    }
  ],
  base: "/taskflow/",
})

