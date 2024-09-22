import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // 引入 path 模組

export default defineConfig({
  plugins: [vue()],
  base: '/FashionSnap/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 設置 '@' 別名，指向 'src' 目錄
    },
  },
});
