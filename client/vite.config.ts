import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    //Pentru React Dev Tools
    sourcemap: true,
    outDir: "../API/wwwroot",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  server: {
    port: 3000,
  },

  define: {
    "process.env.BUILD_PATH": JSON.stringify(process.env.BUILD_PATH),
  },
});
