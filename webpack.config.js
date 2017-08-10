var path = require('path');
var webpack = require('webpack');

module.exports = {
  // context: path.resolve(__dirname, './src'),
  // entry: {
  //   app: './js/entry.js'
  // },
  entry: './js/entry.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      // { test: /\.json$/, loader: 'json' },
      { test: /(pixi|phaser).js/, loader: 'script-loader' }
    ]
  }
};
