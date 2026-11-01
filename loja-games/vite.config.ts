import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // o json-server grava no db.json; sem isso o Vite recarrega a página a cada cadastro/desejo
    watch: { ignored: ['**/db.json'] },
  },
})