import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import istanbul from "vite-plugin-istanbul"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert({
      hosts: ["local.vikeandsell.ca"],
      force: true,
    }),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'cypress', 'test'],
      extension: ['.js', '.ts', '.tsx'],
      cypress: true
    })
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
