const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mode = 'production'

module.exports = {
  mode,
  // 多页面
  entry: {
    main: './src/index.js',
    admin: './src/admin.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/')
    },
    extensions: ['.ts', '.js', '.jsx','.tsx'],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 增加什么后缀就检查什么文件
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    // build 后分离出 css 文件
    mode === 'production' && new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    // build 后分离出 html 文件
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      chunks: ['admin']
    })
  ].filter(Boolean),
  // build 后的 js 文件 hash 重命名
  output: {
    filename: '[name].[contenthash].js'
  },
  // 优化运行时配置
  optimization: {
    // 运行时runtime文件(webpack配置)单独打包, index.js 不变则不会生成新的 main.js,只更新 runtime.js,节省用户带宽。
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          minSize: 0, // 如果不写0，react 文件尺寸太小会被跳过
          test: /[\\/node_modules[\\/]/,  // 为了匹配 node_modules
          name: 'vendors',  // 文件名
          chunks: "all"  // all 表示同步加载和异步加载，async 表示异步加载，initial 表示同步加载
          // 这三行的意思是把两种加载方式的来自 node_modules 目录文件打包为 vendors.xxx.js, vendors 是第三方的意思
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-react', {runtime: 'classic'}],
              ['@babel/preset-typescript']
            ]
          }
        }
      },
      // webpack 配置 sass
      {
        test: /\.s[ac]ss$/i,
        use: [
          // css支持导出, 给 JS 读取
          mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                compileType: 'icss'
              }
            }
          },
          {
            loader: "sass-loader",
            // sass 自动导入全局，不用每个文件写import scss
            options: {
              additionalData: `
                @import "~@/scss-vars.scss";
              `,
              sassOptions: {
                includePaths: [__dirname]
              }
            }
          }
        ]
      }
    ]
  }
}
