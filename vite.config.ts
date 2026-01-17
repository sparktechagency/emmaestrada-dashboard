import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // host: "72.62.176.14",    
    host: "10.10.7.46",    
    port: 3010,
    allowedHosts: [
      'dashboard.wesound.app',
      'www.dashboard.wesound.app',
      'localhost',
    ],
  },  
})
