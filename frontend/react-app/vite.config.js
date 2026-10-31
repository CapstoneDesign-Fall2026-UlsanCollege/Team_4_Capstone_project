import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createPhotoHandler } from '@campusvibes/backend/feed-photo';
import { createAssistantHandler } from '@campusvibes/backend/assistant';

export default defineConfig(({ mode }) => ({
  plugins: [react(), {
    name: 'local-feed-photos',
    configureServer(server) {
      server.middlewares.use('/api/feed-photo', createPhotoHandler({ env: { ...process.env, ...loadEnv(mode, process.cwd(), '') } }));
      server.middlewares.use('/api/assistant', createAssistantHandler({ env: { ...process.env, ...loadEnv(mode, process.cwd(), '') } }));
    },
  }],
}));
