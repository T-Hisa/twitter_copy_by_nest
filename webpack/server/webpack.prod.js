const webpackMerge = require('webpack-merge')
const commonConf = require('./webpack.common')

// const outputFilename = '[hash]'
const outputFilename = 'server'
module.exports = webpackMerge(commonConf(outputFilename), {
  mode: 'production'
})