import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   preview: {
//     allowedHosts: ["dmpropane-production.up.railway.app"],
//     port: Number(process.env.PORT) || 4173,
//     host: true, // listen on all interfaces
//   },
// });
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log('ENV: ', env.VITE_API_URL);
  const apiTarget = env.VITE_API_URL || 'http://localhost:3000';
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    preview: {
      allowedHosts: ["dmpropane-production.up.railway.app"],
      port: Number(process.env.PORT) || 4173,
      host: true,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
});
