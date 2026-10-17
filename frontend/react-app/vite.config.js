import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createPhotoHandler } from './server/feed-photo.js';

export default defineConfig(({ mode }) => ({
  plugins: [react(), {
    name: 'local-feed-photos',
    configureServer(server) {
      server.middlewares.use('/api/feed-photo', createPhotoHandler({ env: { ...process.env, ...loadEnv(mode, process.cwd(), '') } }));
    },
  }],
}));
