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
      { test: path.join(__dirname, 'js'), loader: 'babel-loader', query: { presets: 'es2015' } },
      { test: /(pixi|phaser).js/, loader: 'script-loader' }
    ]
  }
};
