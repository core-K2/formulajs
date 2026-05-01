import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
const name = pkg.name.split('/').at(-1)
const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * License: ${pkg.license || 'MIT'}
 * Built: ${new Date().toISOString().split('T')[0]}
 */`

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    build: {
      outDir: 'dist',
      emptyOutDir: isProd,
      sourcemap: isProd,
      minify: isProd ? 'esbuild' : false,
      lib: {
        entry: 'src/index.js',
        name: name,
        formats: ['es', 'umd'],
        fileName: (format) => {
          const suffix = isProd ? '.min' : ''
          return `${name}.${format}${suffix}.js`
        }
      },
      rollupOptions: {
        output: {
          banner: banner
        }
      }
    }
  }
})
