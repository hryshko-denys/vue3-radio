import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      proxy: {
        "/getRadioSongs": {
          target: process.env.VITE_RADIO_SONGS_API,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/getRadioSongs/, ""),
        },
        "/getSongAlbum": {
          target: process.env.VITE_APPLE_SONGS_API,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/getSongAlbum/, ""),
        },
      },
    },
    plugins: [vue()],
  });
};
