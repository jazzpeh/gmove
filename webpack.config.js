const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './demo/demo.js',
  output: {
    path: __dirname + '/dist',
    filename: 'demo.bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'GMove - Demo',
    template: './demo/demo.html',
  })],
};
