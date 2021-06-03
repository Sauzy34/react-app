/* eslint-disable import/no-extraneous-dependencies */
const {merge} = require('webpack-merge')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const production = require('./webpack.prod')

module.exports = merge(production, {
  plugins: [
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
      statsFilename: '../bundle-stats.json',
      openAnalyzer: true,
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
    }),
  ],
})
