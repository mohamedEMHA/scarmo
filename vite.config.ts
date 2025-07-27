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
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@stripe/stripe-js': path.resolve(__dirname, 'node_modules/@stripe/stripe-js/dist/esm'),
    },
  },
  optimizeDeps: {
    include: ['@stripe/stripe-js'],
  },
}));
