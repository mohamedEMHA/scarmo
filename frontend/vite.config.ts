import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    build: {
      outDir: 'build'
    },

    // Server configuration
    server: {
      port: 3000,
      host: '0.0.0.0', // Explicitly bind to all interfaces
      allowedHosts: true
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
      __WS_TOKEN__: JSON.stringify(env.VITE_WS_TOKEN),
      'process.env.VITE_PRINTFUL_API_TOKEN': JSON.stringify(env.VITE_PRINTFUL_API_TOKEN),
      'process.env.VITE_STRIPE_PUBLISHABLE_KEY': JSON.stringify(env.VITE_STRIPE_PUBLISHABLE_KEY),
    },
  });
};
