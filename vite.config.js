import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
const name = pkg.name.split('/').pop()
const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * Homepage: ${pkg.homepage}
 * License: ${pkg.license || 'MIT'}
 * Built: ${new Date().toISOString().split('T')[0]}
 */`

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  const suffix = isProd ? '.min' : ''
  const fileName = (format) => `${name}.${format}${suffix}.js`

  return {
    build: {
      outDir: 'dist',
      emptyOutDir: false,
      sourcemap: !isProd,
      minify: isProd ? 'terser' : false,
      terserOptions: isProd
        ? {
            format: {
              comments: /^!/
            }
          }
        : {},
      lib: {
        entry: 'src/index.js',
        name,
        formats: ['es', 'umd'],
        fileName
      },
      rollupOptions: {
        output: {
          banner
        }
      }
    }
  }
})
