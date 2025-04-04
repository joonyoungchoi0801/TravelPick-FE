import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      // { find: '@components', replacement: '/src/components' },
      // { find: '@styles', replacement: '/src/styles' },
      // { find: '@pages', replacement: '/src/pages' },
      // { find: '@utils', replacement: '/src/utils' },
      // { find: '@hooks', replacement: '/src/hooks' },
      // { find: '@api', replacement: '/src/api' },
      // { find: '@assets', replacement: '/src/assets' },
      // { find: '@public', replacement: '/public' },
    ],
  },
});
