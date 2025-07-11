import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  server: {
    allowedHosts: ["role-quantity-zus-transactions.trycloudflare.com", "localhost:5173"],
    proxy: {
      '/api': {
        target: 'role-quantity-zus-transactions.trycloudflare.com',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    hmr: {
      clientPort: 5173,
    },
  },
});
