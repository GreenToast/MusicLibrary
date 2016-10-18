var path = require('path');
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, '../node_modules');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var dir_client = path.resolve(__dirname, './src/client/scripts');
var dir_dist = path.resolve(__dirname, '.build');
var APP_DIR = path.resolve(__dirname, 'src/app');
var WebpackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: {
       // 'index.html': APP_DIR + '/index.html',
        'bundle.js': APP_DIR + '/app.jsx'
    },
  output: {
    path: dir_dist,
    filename: "[name]"
  },
  resolve: {
    extensions: ['', '.jsx', '.js', 'html']
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new LiveReloadPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        template: APP_DIR + '/index.html',
        inject: 'body'
    })
  ],
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  },
  devtool: 'source-map'
};

module.exports = config;
