const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const os = require('os');

// 获取本机ip地址
function getIPAdress() {
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.address.startsWith('169.254') &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}

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
        use: ['babel-loader','ts-loader'],
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
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Application running in http://localhost:8008/`]
      },
      clearConsole: true
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      "@": path.resolve(__dirname, "src")
    },
  },
  devServer: {
    compress: true,
    public: `${getIPAdress()}:8008`,
    port: 8008,
    host: '0.0.0.0', // 监听本机所有能外部访问的ip
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
      {
        context: ['/static_file/', '/markdown/img/'],
        target: 'https://local.monako.club/',
        changeOrigin: true,
        secure: false
      }
    ],
  },
  optimization: {
    minimize: true // 开启代码压缩
  }
};

module.exports = config;
