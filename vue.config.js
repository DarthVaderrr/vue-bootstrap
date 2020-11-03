const path = require('path');
const dir = d => path.resolve(__dirname, d);
module.exports = {
  publicPath: './',
  devServer: {
    open:true,
    proxy: {
      '/api': {
        target: 'https://api.xxx.com/',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        secure: false,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@utils': dir('src/utils'),
        '@api': dir('src/api'),
        '@map': dir('src/utils/map'),
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|lib)/,
          use: [
            {
              loader: 'eslint-loader',
              options: {
                fix: true
              }
            }
          ]
        },
        {
          test: /\.vue$/,
          exclude: /(node_modules|lib)/,
          use: [
            {
              loader: 'eslint-loader',
              options: {
                fix: true
              }
            }
          ]
        },
      ]
    }
  }
}