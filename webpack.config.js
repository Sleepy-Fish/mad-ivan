const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.join(__dirname, 'src'),
      '@src': path.join(__dirname, 'src'),
      '@static': path.join(__dirname, 'static'),
      '@assets': path.join(__dirname, 'assets'),
    },
  },
  plugins: [
    new ESLintPlugin({
      files: './src/',
      extensions: ['js', 'ts'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /(node_modules)/,
      },
    ],
  },
};
