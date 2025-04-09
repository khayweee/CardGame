import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // Ensure this matches the port in docker-compose.dev.yml
    host: '0.0.0.0', // Allow access from outside the container
  },
})


