import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert({
      hosts: ["local.vikeandsell.ca"],
      force: true,
    }),
  ],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://home.brnn.ca",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});
