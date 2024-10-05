import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/youtube-clone-react-ts/", // Add trailing slash
  plugins: [react()],
  envPrefix: 'VITE_',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})