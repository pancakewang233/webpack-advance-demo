const ESLintWebpackPlugin = require('eslint-webpack-plugin')
module.exports = {
  mode: 'production',
  resolve: {
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
      }
    ]
  }
}
