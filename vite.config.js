import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: [
        "icon.svg",
        "icon-192.png",
        "icon-512.png",
        "apple-touch-icon.png",
        "fonts/*",
      ],
      manifest: {
        name: "OVERSHARED — A digital detective game",
        short_name: "OVERSHARED",
        description: "Connect the clues. Protect your digital life.",
        theme_color: "#f5f3ec",
        background_color: "#f5f3ec",
        display: "standalone",
        start_url: "./",
        scope: "./",
        id: "./",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg,ttf,woff2}"],
        cleanupOutdatedCaches: true,
        navigateFallback: "index.html",
      },
    }),
  ],
  server: { port: 5188, strictPort: true },
});
