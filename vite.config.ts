import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
// https://vite-pwa-org.netlify.app/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '番茄钟🍅',
        short_name: '番茄钟🍅',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logo-192x192.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/logo-192x192.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
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
