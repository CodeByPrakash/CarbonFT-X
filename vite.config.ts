import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: './',
  // inspectAttr() writes debug source-location attributes onto the DOM for
  // Kimi's editor — dev-only, so it never ships in the production build.
  plugins: [command === 'serve' ? inspectAttr() : null, react()].filter(Boolean),
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
