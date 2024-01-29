import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Sử dụng "jsx" loader cho tệp ".js" để hỗ trợ JSX syntax
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 3000, // Cài đặt cổng
   
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
})
