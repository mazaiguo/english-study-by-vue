import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      // 代理所有 /api/data 请求到 GitHub Pages
      '/api/data': {
        target: 'https://mazaiguo.github.io/blogimg/english-study-data',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/data/, ''),
        secure: true
      }
    }
  }
})

