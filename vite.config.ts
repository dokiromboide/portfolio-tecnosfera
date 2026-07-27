import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages: el repo se sirve desde /<repo>/ en producción.
// Usamos base relativo ('./') para que los assets carguen igual en dev y en Pages.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
