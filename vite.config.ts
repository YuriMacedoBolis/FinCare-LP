import { defineConfig } from 'vite';
import { TanStackStartVite } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    TanStackStartVite(), // Já gerencia o preset da Vercel por baixo dos panos via Nitro
    react(),
    tailwindcss(),
    tsConfigPaths()
  ],
});
