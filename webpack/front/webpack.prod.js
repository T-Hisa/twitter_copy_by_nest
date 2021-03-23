const path = require('path')
const webpackMerge = require('webpack-merge')
const commonConf = require('./webpack.common')

const outputFilename = '[name]-[chunkhash]'
const isMinify = true

