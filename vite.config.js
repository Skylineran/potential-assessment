import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 核心：引入 path 模块

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 核心：告诉 Vite，凡是遇到 "@" 开头的路径，都指向 "src" 目录
      '@': path.resolve(__dirname, './src')
    }
  }
})