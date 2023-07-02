module.exports = {
  env: {
    browser: true,
    es2021: true
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': [0, 'smart-tabs']

  }
}
