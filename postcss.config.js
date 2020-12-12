/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    require('postcss-preset-env'),
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9' // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
      overrideBrowserslist: ['> 0.15% in CN']
    }), // 引入
    require('cssnano')() // 压缩css
  ]
};
