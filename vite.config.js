import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Tsi-Si1/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
