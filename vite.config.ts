import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  return {
    plugins: [vue()],
    define: {
      "process.env.API_URL": JSON.stringify(env.API_URL),
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.API_URL || "http://127.0.0.1:8000",
          changeOrigin: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      },
    },
  };
});
