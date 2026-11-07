import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// Tailwind is used only by the React subjects in src/subjects/ (each one scopes
// its own sources with `@import "tailwindcss" source(...)`); the extracted
// legacy pages keep their original CSS.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1200,
  },
});
