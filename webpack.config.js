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
    // rules: [
    //   {
    //     test: /\.exec\.js$/,
    //     use: [ 'script-loader' ]
    //   }
    // ],
    loaders: [
      {
        test: /.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      { test: /(pixi|phaser).js/, loader: 'script-loader' },
      {
        test: /\.exec\.js$/,
        loader: 'script-loader'
      }
    ],
  }
};
