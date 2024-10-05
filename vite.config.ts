import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/youtube-clone-react-ts/",
  plugins: [react()],
  envPrefix: 'VITE_',
})
