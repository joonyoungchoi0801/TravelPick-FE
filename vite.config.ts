import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  server: isDev
    ? {
        https: {
          key: fs.readFileSync('localhost-key.pem'),
          cert: fs.readFileSync('localhost.pem'),
        },
      }
    : undefined,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
