import path from 'node:path'
import { createHash } from 'node:crypto'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const createScopedName = (localName: string, filePath: string) => {
  const componentName = path
    .basename(filePath)
    .replace(/\.module\.(scss|css)$/i, '')

  const hash = createHash('sha1')
    .update(`${filePath}\0${localName}`)
    .digest('base64url')
    .slice(0, 5)

  return `${componentName}_${localName}__${hash}`
}

export default defineConfig({
  plugins: [
    svgr({
      include: '**/*.svg?react',
    }),
    react(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      generateScopedName: createScopedName,
    },
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, './src/shared/styles')],
        additionalData: `@use "inject" as *;\n`,
      },
    },
  },
})
