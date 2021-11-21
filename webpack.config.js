const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mode = 'production'

module.exports = {
  mode,
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
    mode === 'production' && new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin()
  ].filter(Boolean),
  output: {
    filename: '[name].[contenthash].js'
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
