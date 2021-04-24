const webpackMerge = require('webpack-merge');
const commonConf = require('./webpack.common');

const outputFilename = '[name]-[hash]';
const isProd = true;

module.exports = () =>
  webpackMerge(commonConf({ outputFilename, isProd }), {
    mode: 'production',
  });
