import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    globals: true,
    css: false,
    restoreMocks: true,
    pool: "threads",
    // One worker: two parallel jsdom workers ran out of memory on a low-RAM machine.
    maxWorkers: 1,
    isolate: false,
  },
});
