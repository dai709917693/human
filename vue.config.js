/*
 * @description: human
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-09-05 08:59:24
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-09 09:19:12
 */
module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        prependData: '@import "~@/assets/style/common.scss";'

      }
    }
  }
}
