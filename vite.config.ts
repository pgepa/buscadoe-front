import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'doe.png'],
            manifest: {
                name: 'BuscaDOE',
                short_name: 'BuscaDOE',
                description: 'Sistema de Busca Avançada do Diário Oficial Eletrônico da Procuradoria-Geral do Estado do Pará',
                theme_color: '#3b82f6',
                background_color: '#f8fafc',
                display: 'standalone',
                orientation: 'portrait',
                scope: '/',
                start_url: '/',
                lang: 'pt-BR',
                icons: [
                    {
                        src: '/doe.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable any'
                    },
                    {
                        src: '/doe.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable any'
                    },
                    {
                        src: '/doe.png',
                        sizes: '180x180',
                        type: 'image/png',
                        purpose: 'apple touch icon'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https?:\/\/.*\/api\//,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'api-cache',
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 60 * 60 * 24 // 24 horas
                            },
                            networkTimeoutSeconds: 10
                        }
                    },
                    {
                        urlPattern: /\.(?:png|gif|jpg|jpeg|svg|ico|webp)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'images-cache',
                            expiration: {
                                maxEntries: 200,
                                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 dias
                            }
                        }
                    }
                ]
            },
            devOptions: {
                enabled: true
            }
        })
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
