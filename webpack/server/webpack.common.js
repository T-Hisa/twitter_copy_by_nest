const path = require('path');
const nodeExternals = require('webpack-node-externals')

module.exports = (outputFilename) => ({
  // entry: ['webpack/hot/poll?100', path.resolve(process.cwd(), './src/server/main')],
  // entry: [path.resolve(process.cwd(), './src/server/main'), 'webpack-hot-middleware/client'],
  entry: path.resolve(process.cwd(), './server/main'),
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(process.cwd(), './dist'),
    // filename: 'server.js',
    filename: `${outputFilename}.js`,
    chunkFilename: `${outputFilename}.js`,
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './'),
    },
    extensions: ['.js', '.ts', '.tsx'],
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
        test: /\.tsx?$/,
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
});
