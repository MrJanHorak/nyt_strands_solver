import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html',
      open: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const packages = ['react', 'react-dom', 'lodash', 'axios']; // Add other large packages here
            const chunkName = packages.find(pkg => id.includes(pkg));
            return chunkName ? chunkName : 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the chunk size limit if needed
  },
});