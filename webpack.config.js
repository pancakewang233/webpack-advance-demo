const ESLintWebpackPlugin = require('eslint-webpack-plugin')
module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js', '.jsx'],
  },
  plugins: [new ESLintWebpackPlugin({
    // 增加什么后缀就检查什么文件
    extensions: ['.js', '.jsx']
  })],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env'],['@babel/preset-react', {runtime: 'classic'}]]
          }
        }
      }
    ]
  }
}
