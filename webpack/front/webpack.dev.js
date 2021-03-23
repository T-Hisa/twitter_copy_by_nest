const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConf = require('./webpack.common');
// const webpack = require("webpack")

const outputFilename = '[name]';
const isMinify = false;

module.exports = () =>
  webpackMerge(commonConf({ outputFilename, isMinify }), {
    mode: 'development',
    devtool: 'source-map',
    // watch: true,
    devServer: {
      //   open: true,
      contentBase: path.resolve(process.cwd(), 'dist/front'),
      clientLogLevel: 'warning',
      hot: true,
      compress: true,
      host: 'localhost',
      port: 3000,
      open: true,
      overlay: true,
      proxy: {},
      quiet: true, // necessary for FriendlyErrorsPlugin
      watchContentBase: true,
      watchOptions: {
        poll: false,
        ignored: /node_modules/,
      },
      // publicPath: 'dist',
      // historyApiFallback: {
      //   rewrites: [
      //     { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      //   ],
      // },
    },
  });
