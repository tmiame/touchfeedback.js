'use strict'

/**
 * Webpack
 * - https://webpack.js.org/
 */

const path = require('path')
const webpack = require('webpack')

const webpackPath = {
  entry: path.resolve(__dirname, './main.js'),
  output: path.resolve(__dirname, './')
}

const webpackConfig = {
  devtool: 'eval',
  entry: {
    main: webpackPath.entry
  },
  output: {
    path: webpackPath.output,
    publicPath: '/',
    filename: '[name]-compiled.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    modules: [path.resolve(__dirname), 'node_modules'],
    extensions: ['.js'],
    alias: {
      'root': path.resolve('./')
    }
  }
}

module.exports = (env) => {
  return webpackConfig
}
