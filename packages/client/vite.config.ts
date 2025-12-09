import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ["dmpropane-production.up.railway.app"],
    port: Number(process.env.PORT) || 4173,
    host: true, // listen on all interfaces
  },
});
