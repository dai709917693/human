/*
 * @description: human
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-09-03 08:54:08
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-04 08:53:09
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [2, 'never'], // 语句不允许分号结尾
    quotes: [2, 'single'] // 引号类型 `` "" ''
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
