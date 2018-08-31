const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HTMLWebPackPlugin({
  template: './src/client/index.html',
  filename: path.resolve(__dirname, 'dist', 'index.html'),
});

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
    contentBase: path.resolve(__dirname, 'dist'),
  },
  plugins: [htmlPlugin],
};