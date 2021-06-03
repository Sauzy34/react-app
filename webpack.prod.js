/* eslint-disable import/no-extraneous-dependencies */
const {merge} = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TeserWebpackPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devtool: false,
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TeserWebpackPlugin()],
  },
  // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
  plugins: [
    new MiniCssExtractPlugin({filename: '[name].[chunkhash].bundle.css'}),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      favicon: 'src/public/favicon.ico',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /(en-gb).js/),
  ],
  module: {
    rules: [
      // eslint-disable-next-line max-len
      // css-loader to bundle all the css files into one file and MiniCssExtractPlugin.loader extracts css into files
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
})
