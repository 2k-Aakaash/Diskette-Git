import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
   server: {
    host: true, 
  },
  base: '/Diskette/',
  plugins: [react()],
  optimizeDeps: {
    include: ['jspdf', 'file-saver']
  }
})
