import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import compression from "vite-plugin-compression2";

export default defineConfig({
    plugins: [
        react(),
        splitVendorChunkPlugin(),
        compression({
            algorithm: "gzip",
            deleteOriginalAssets: false,
            exclude: [/\.(png)$/, /\.(jpg)$/],
        }),
    ],
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
