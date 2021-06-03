/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const path = require('path')
const dotenv = require('dotenv')

const env = dotenv.config().parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
  // eslint-disable-next-line no-param-reassign
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = {
  entry: {
    app: './src/',
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components/'),
      pages: path.resolve(__dirname, './src/pages/'),
      images: path.resolve(__dirname, './src/images/'),
      context: path.resolve(__dirname, './src/context/'),
      utils: path.resolve(__dirname, './src/utils/'),
      Constants: path.resolve(__dirname, './src/constants/'),
      API: path.resolve(__dirname, './src/api/'),
      hooks: path.resolve(__dirname, './src/hooks/'),
      react: path.resolve('./node_modules/react'),
    },
    extensions: ['.jsx', '.js'],
  },
  optimization: {
    usedExports: true,
  },
  module: {
    rules: [
      // we use babel-loader to load our jsx and tsx files
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(eot|gif|otf|png|svg|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[chunkhash].[ext]',
            outputPath: 'assets',
          },
        }, // ?name=[name].[ext] is only necessary to preserve the original file name
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(envKeys),
  ],
}
