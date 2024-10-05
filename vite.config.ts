import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/youtube-clone-react-ts/",
  plugins: [react()],
  envPrefix: 'VITE_',
  server: {
    proxy: {
      '/youtube-api': {
        target: 'https://www.googleapis.com/youtube/v3',
        changeOrigin: true, // This makes the proxy change the origin to the target URL
        rewrite: (path) => path.replace(/^\/youtube-api/, ''), // Rewrites /youtube-api in your requests to ''
      },
    },
  },
})
