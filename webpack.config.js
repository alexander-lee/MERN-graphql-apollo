'use strict';
const webpack = require('webpack');
const path = require('path');

const debug = process.env.NODE_ENV !== 'production';
const productionPlugins = [
  new webpack.optimize.UglifyJsPlugin()
];

module.exports = {
  entry: [
    path.join(__dirname, 'client', 'app.js')
  ],
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  cache: false,
  devtool: debug ? 'source-map' : null,
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|graphql|gql)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|woff|woff2|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192, prefix: '/'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: debug
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    ...!debug && productionPlugins
  ]
}
