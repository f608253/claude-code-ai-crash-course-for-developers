import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./src/test/setup.ts'],
    // Worker processes time out in this environment; run files serially in
    // worker threads instead.
    pool: 'threads',
    maxWorkers: 1,
    minWorkers: 1,
    // Reuse the worker across files (each test cleans up its own DOM).
    isolate: false,
  },
})