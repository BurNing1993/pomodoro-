import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { builtinModules } from 'module'
import * as path from 'path'
import { versions } from '../../electron-vendors.config'
const ROOT = path.resolve(__dirname, '../../')

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  base: './',
  plugins: [react()],
  build: {
    sourcemap: true,
    target: `chrome${versions.chrome}`,
    outDir: path.join(ROOT, 'dist/renderer'),
    rollupOptions: {
      external: ['electron', ...builtinModules],
    },
    emptyOutDir: true,
  },
})
