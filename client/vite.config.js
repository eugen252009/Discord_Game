import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  server: {
    allowedHosts: ["sometimes-german-lesson-injuries.trycloudflare.com"],
    proxy: {
      '/api': {
        target: 'sometimes-german-lesson-injuries.trycloudflare.com',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    hmr: {
      clientPort: 3001,
    },
  },
});
