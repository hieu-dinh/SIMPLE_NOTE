import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,  // Use polling to detect file changes (needed in some environments like Docker)
    },
    host: true,  // Allows the app to be accessed externally (important for Docker)
    strictPort: true,  // Ensure the specified port is used (no automatic fallback)
    port: 3000,  // The port for the Vite dev server (can be changed)
  }
});