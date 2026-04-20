import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 优化构建输出
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          // 将第三方库分离到单独的chunk
          vendor: ['react', 'react-dom', 'react-router-dom'],
          pyodide: ['pyodide'],
          editor: ['@monaco-editor/react'],
          charts: ['recharts'],
        },
      },
    },
  },
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
  },
  // 优化依赖项处理
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'recharts'],
    exclude: ['pyodide'], // 避免Pyodide被预构建
  },
  // 静态资源处理
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
  // 配置缓存
  cacheDir: '.vite-cache',
})