const webpackMerge = require('webpack-merge')
const commonConf = require('./webpack.common')

// const outputFilename = '[hash]'
const outputFilename = 'server'

module.exports = webpackMerge(commonConf(outputFilename), {
  mode: 'production',
  // minimize: false にしておかないと、passport 周りでなぜかおかしくなる
  // (具体的には、LocalStrategy と jwtStrategy の片方が読み込まれなくなる)
  // ので、渋々minimize: false にしておく
  optimization: {
    minimize: false,
  },
})