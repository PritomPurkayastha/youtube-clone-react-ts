import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/youtube-clone-react-ts/",
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle() {
        // Copy index.html to 404.html for GitHub Pages SPA routing
        copyFileSync(
          join(__dirname, 'dist', 'index.html'),
          join(__dirname, 'dist', '404.html')
        )
      }
    }
  ],
  envPrefix: 'VITE_'
})
