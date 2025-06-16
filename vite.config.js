import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';


export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@components' : path.resolve(__dirname, './src/components'),
            '@contexts': path.resolve(__dirname, './src/contexts')
        }
    },
    server: {
        host: 'movie-search.test',
        port: 5500,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            }
        }
    }
});
