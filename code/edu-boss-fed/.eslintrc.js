module.exports = {
  root: true,
  env: {
    node: true
  },
  // 使用插件的编码规则
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  // 自定义编码规则
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': ['error', 'never'],
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'none',
        'requireLast': false
      }
    }],
    '@typescript-eslint/no-explicit-any': ["off"],
    '@typescript-eslint/camelcase': ["off"]
  }
}
