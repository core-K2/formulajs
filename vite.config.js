import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',           // formulajsのエントリポイント（バージョンによって調整）
      name: 'formulajs',               // UMD/IIFE用（今回は使わない）
      formats: ['es'],                 // ESM のみ出力（これが重要！）
      fileName: (format) => `formula.${format}.js`
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: true                       // 圧縮したい場合は true
  }
});