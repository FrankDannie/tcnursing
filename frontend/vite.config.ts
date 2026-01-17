import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or whatever plugin you use

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,      // force polling
      interval: 100,         // check every 100ms
    },
    host: true,               // expose to host machine
    port: 5173,
  },
})
