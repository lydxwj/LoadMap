import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: './src/loadMap.js',
  watch: {
    exclude: 'node_modules/**',
  },
  output: {
    file: './lib/loadMap.js',
    name: 'loadMap',
    format: 'umd'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' })
  ]

}