const webpackMerge = require('webpack-merge');
const NodemonPlugin = require('nodemon-webpack-plugin')
const commonConf = require('./webpack.common');
const path = require('path')

module.exports = webpackMerge(commonConf, {
  mode: 'development',
  watch: false,
  plugins: [
    new NodemonPlugin({
      watch: path.join(process.cwd(), './dist'),
      ignore: ['**/*.js.map'],
      script: path.join(process.cwd(), './dist/server.js')
    })
  ]
})