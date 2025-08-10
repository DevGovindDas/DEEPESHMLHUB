import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Use local network IP for mobile access
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // This allows access from any IP on the network
    port: 5173,
    strictPort: true,
  },
});
