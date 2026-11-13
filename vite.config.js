import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // "localhost" resolves to ::1 on this machine, so Vite listened on IPv6 only
    // and http://127.0.0.1:5173 was refused. "::" accepts both address families.
    host: '::',
    port: 5173,
  },
})
