import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/bing': {
        target: 'https://cn.bing.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bing/, ''),
      },
    },
  },
})
