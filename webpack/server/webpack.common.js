const webpack = require('webpack');
const path = require('path');

module.exports = {
  // entry: ['webpack-hot-middleware/client', path.resolve(process.cwd(), './src/server/main')],
  entry: path.resolve(process.cwd(), './src/server/main'),
  target: 'node',
  output: {
    path: path.resolve(process.cwd(), './dist'),
    filename: 'server.js',
    chunkFilename: `[name].js`,
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './'),
    },
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modulles/,
        loader: 'ts-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendors: {
          name: 'vendor',
          test: /node_modules/,
        },
      },
    },
  },
};
