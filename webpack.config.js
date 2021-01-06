const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const config = {
  entry: [path.resolve(__dirname, './example/src/app.js')],
  output: {
    path: path.resolve(__dirname, './example/dist'),
    filename: 'index.js'
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  stats: 'errors-only',
  infrastructureLogging: {
    level: 'none' // 不显示log
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
          'css-loader',
          'postcss-loader',
          'less-loader'
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
      template: path.resolve(__dirname, './example/src/index.html'),
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].min.css'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  }
};

// 是否是开发模式 process.env.WEBPACK_DEV_SERVER
if (process.env.WEBPACK_DEV_SERVER) {
  config.devServer = {
    compress: true,
    port: 8008,
    quiet: true,
    overlay: true,
    open: true,
    proxy: [
      {
        context: ['/docs'],
        target: 'https://es6.ruanyifeng.com/',
        changeOrigin: true,
        secure: false
      },
      {
        context: ['/doc/'],
        target: 'https://es6.ruanyifeng.com/',
        changeOrigin: true,
        pathRewrite: {'^/doc/' : ''},
        secure: false
      },
    ],
  };
  config.plugins = [
    ...config.plugins,
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Application running in http://localhost:8008/`]
      },
      clearConsole: true
    })
  ];
} else {
  config.optimization = {
    minimize: true // 开启代码压缩
  };
}

module.exports = config;
