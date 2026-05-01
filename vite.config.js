import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  const name = 'formulajs'

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
      }
    }
  }
})
