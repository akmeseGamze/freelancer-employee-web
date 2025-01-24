import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
  root: path.resolve('./src'),
  plugins: [
    react({ include: "./**/*.{jsx,tsx,css}" }),
  ],
  server: {
    port: 5173,
  },
});