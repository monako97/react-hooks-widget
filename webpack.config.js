/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 是否是开发模式 process.env.WEBPACK_DEV_SERVER

module.exports = {
  entry: [path.join(__dirname, './example/src/app.js')],
  output: {
    path: path.join(__dirname, 'example/dist'),
    filename: 'index.js'
  },
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM'
  },
  optimization: {
    minimize: true // 开启代码压缩
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|mp4)$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: 'fonts/[name].[ext]'
        },
        exclude: /node_modules/ // 排除项
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './example/src/index.html'),
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].min.css'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    port: 8008
  }
};
