import { defineConfig, normalizePath } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: normalizePath(path.resolve("./")),
  server: {
    host: true,
    port: 5000,
  },
  resolve: {
    alias: {
      '@Pages': path.resolve(__dirname, 'src/Pages/'),
      '@Utils': path.resolve(__dirname, 'src/Utils/'),
      '@Assets': path.resolve(__dirname, 'src/assets/'),
      '@Components': path.resolve(__dirname, 'src/Components/'),
    },
  },
  plugins: [svelte()],
})
