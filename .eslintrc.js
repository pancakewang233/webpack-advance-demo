module.exports = {
  extends: ['react-app'],
  rules: {
    // 'react/jsx-users-react': [2],
    // 提示要在 jsx 里手动引入 React
    'react/react-in-jsx-scope': [2]
  },
  overrides: [{
    files: ['*.ts', '*.tsx'],
    parserOptions: {
      project: './tsconfig.json'
    },
    extends: ['airbnb-typescript'],
    rules: {
      '@/typescript-eslint/object-curly-spacing': [0],
      'import/prefer-default-export': [0]
    }
  }]

}
