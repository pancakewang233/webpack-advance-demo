const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const path = require('path')
module.exports = {
  mode: 'production',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/')
    },
    extensions: ['.ts', '.js', '.jsx','.tsx'],
  },
  plugins: [new ESLintWebpackPlugin({
    // 增加什么后缀就检查什么文件
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  })],
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
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
