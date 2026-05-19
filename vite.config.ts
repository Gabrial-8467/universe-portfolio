import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  cacheDir: ".vite",
  resolve: {
    dedupe: ["react", "react-dom", "three", "@react-three/fiber", "zustand"],
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [react()],
})
