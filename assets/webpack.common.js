const path = require('path');
const jsPath = `${path.resolve(__dirname, 'js')}/`;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');

module.exports = {
  entry: {
    app: `${jsPath}app.js`
  },
  output: {
    path: path.resolve(__dirname, '../static/js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'scss'),
      '@plugins': path.resolve(__dirname, 'js', 'plugins'),
      '@js': path.resolve(__dirname, 'js')
    }
  },
  plugins: [
    new CleanTerminalPlugin({
      skipFirstRun: true
    }),
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ['./*', '../css/*'],
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new MiniCssExtractPlugin({
      filename: `../css/[name].css`,
    }),
  ],
};
