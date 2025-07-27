import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "127.0.0.1",
    port: 8080,
    watch: {
      ignored: ['**/node_modules/**'],
    },
    proxy: {
      '/api/printful': {
        target: 'https://api.printful.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/printful/, ''),
      },
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['@stripe/stripe-js'],
  },
  ssr: {
    noExternal: ['@stripe/stripe-js'],
  },
  define: {
    __WS_TOKEN__: JSON.stringify(process.env.VITE_WS_TOKEN || ''),
  },
}));
