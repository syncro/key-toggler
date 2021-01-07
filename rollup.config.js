
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs'

export default {
  input: 'index.js',
  output: {
    globals: {
    },
    file: 'dist/key-toggler-bundle.js',
    format: 'umd',
    name: 'window',
    extend: true,
    sourcemap: true,
  },
  external: [  ],
  plugins: [
    babel({ runtimeHelpers: true }),
    nodeResolve({ mainFields: ['jsnext:main']}),
    commonJS({})
  ]
};
