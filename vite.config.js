import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
    plugins: [vue()],
    css: {
        postcss: {
            plugins: [
                tailwindcss(),
                autoprefixer()
            ]
        },
        preprocessorOptions: {
            css: {
                additionalData: `@import '@fortawesome/fontawesome-free/css/all.css';`,
            },
        },
    }
})
