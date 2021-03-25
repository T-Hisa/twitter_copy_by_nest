const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ outputFilename, isProd }) => ({
  // entry: './src/front/main',
  entry: ['./client/main', 'babel-polyfill'],
  output: {
    path: path.resolve(process.cwd(), 'dist/client'),
    filename: `${outputFilename}.js`,
    chunkFilename: `${outputFilename}.js`,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx', 'scss'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modues/,
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
        test: /\.s?(c|a)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /.json$/,
        exclude: /node_modues/,
        loader: 'json-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modues/,
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
    minimize: isProd,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'client/index.html'),
      // filename: 'index.html',
      inject: 'body',
      minify: isProd,
    }),
  ],
});
