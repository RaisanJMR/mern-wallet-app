import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    '/api/upload/': 'http://localhost:8080',
  },
  plugins: [react()],
})
