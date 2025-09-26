import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [
        react(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    // Configuração para servir assets como arquivos públicos
    publicDir: 'public',
    assetsInclude: ['**/*.ico', '**/*.png']
})
