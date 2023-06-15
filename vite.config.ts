import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 8000,
    },
    build: {
        chunkSizeWarningLimit: 1024,
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
});
