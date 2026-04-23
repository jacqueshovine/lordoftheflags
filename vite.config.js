import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'
import pkg from './package.json'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pwa/*.png'],
      workbox: {
        // Cache all JS, CSS, HTML, SVG and PNG files at build time.
        // Without 'svg', flag images would be fetched from the network
        // and fail when offline.
        globPatterns: ['**/*.{js,css,html,svg,png}'],
      },
      manifest: {
        name: 'Lord of the Flags',
        short_name: 'Flags',
        description: 'Guess the flag!',
        theme_color: '#FBF6E9',
        background_color: '#FBF6E9',
        display: 'standalone',
        icons: [
          {
            src: '/pwa/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa/splash-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version)
  },
})
