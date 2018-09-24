const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HTMLWebPackPlugin({
  template: './src/client/index.html',
  filename: 'index.html',
});

module.exports = {
  // entry: './src/client/index.js',
  entry: './src/client/index.jsx',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: '/dist',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [htmlPlugin],
};