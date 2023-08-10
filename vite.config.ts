import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 8000,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        chunkSizeWarningLimit: 1024,
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
});
