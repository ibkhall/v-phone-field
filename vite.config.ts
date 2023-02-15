// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";
import vuetify from 'vite-plugin-vuetify'
export default defineConfig({
  plugins: [
    vue(),
    vuetify({styles: process.env.NODE_ENV=='production' ? 'none' : true}),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/lib/main.ts'),
      name: 'VPhoneField',
      // the proper extensions will be added
      fileName: 'v-phone-field',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'vuetify'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify'
        },
      },
    },
  },
})
