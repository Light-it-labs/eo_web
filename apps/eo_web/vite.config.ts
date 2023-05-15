import path from "path";
import react from "@vitejs/plugin-react";
import {
  defineConfig,
  loadEnv,
  type ConfigEnv,
  type UserConfigExport,
} from "vite";
import mkcert from "vite-plugin-mkcert";

const config = ({ mode }: ConfigEnv): UserConfigExport => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react(), mkcert()],
    build: {
      manifest: true,
      rollupOptions: {
        input: "./src/main.tsx",
      },
    },
    server: {
      https: true,
      open: true,
      origin:
        process.env.VITE_APP_ENV == "local" ? process.env.VITE_APP_URL : "",
    },
    resolve: {
      alias: [{ find: "~", replacement: path.resolve(__dirname, "src") }],
    },
  });
};

export default config;
