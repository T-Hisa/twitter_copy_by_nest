const webpackMerge = require('webpack-merge')
const commonConf = require('./webpack.common')

const outputFilename = '[chunkhash]'
const isMinify = true


module.exports = () => webpackMerge(commonConf({ outputFilename, isMinify}), {
  mode: 'production'
})