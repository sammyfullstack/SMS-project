import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config — the React plugin enables JSX transforms + fast refresh.
// Unless overridden, `npm run dev` serves the app on http://localhost:5173.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://sms-project-ots.onrender.com", // Change to express port
        changeOrigin: true,
      },
    },
  },
});
