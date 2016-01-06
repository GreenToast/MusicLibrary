var LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.scss',  '.css', '.ts', '.js', '.woff2', '.tff', '.eot', '.svg'],
      alias:{
        "jquery-ui":path.resolve(__dirname, 'node_modules/jquery-ui/jquery-ui.js'),
      }
  },

  plugins: [
    new LiveReloadPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  entry: './app/boot.ts',
  output: {
    path: __dirname + "/.build",
    publicPath: '.build/',
    filename: "bundle.js"
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass-loader'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" }
    ]
  },

  devServer: {
    historyApiFallback: true,
    hot: true
  },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};