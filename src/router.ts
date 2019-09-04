/*
 * @description: human
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-09-03 08:54:08
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-04 08:43:00
 */
import Vue from 'vue'
import Router from 'vue-router'
interface view {
  path: string
  name: string
  component: any
}

Vue.use(Router)
const files = require.context('@/views', true, /\.vue$/)
const routes: view[] = files.keys().map(key => {
  let path: string = key.replace(/(\.\/|\.vue)/g, '')
  return {
    path: `/${path}`,
    name: path.replace('/', '-'),
    component: files(key).default
  }
})

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
