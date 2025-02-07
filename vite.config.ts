import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // 插件配置
  plugins: [vue()],

  // 路径别名配置
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  // 服务器配置
  server: {
    port: 3000,
    open: true, // 自动打开浏览器
    proxy: {
      // 代理配置
      "/api": {
        target: "http://your-api-server.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  // 构建配置
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // 生产环境移除 console
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  // CSS 相关配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
});
