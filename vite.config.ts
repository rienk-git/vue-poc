import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
// https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    vuetify({ autoImport: true }) // Enabled by default
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
