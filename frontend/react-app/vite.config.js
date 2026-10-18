import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createPhotoHandler } from './server/feed-photo.js';
import { createAssistantHandler } from './server/assistant.js';

export default defineConfig(({ mode }) => ({
  plugins: [react(), {
    name: 'local-feed-photos',
    configureServer(server) {
      server.middlewares.use('/api/feed-photo', createPhotoHandler({ env: { ...process.env, ...loadEnv(mode, process.cwd(), '') } }));
      server.middlewares.use('/api/assistant', createAssistantHandler({ env: { ...process.env, ...loadEnv(mode, process.cwd(), '') } }));
    },
  }],
}));
