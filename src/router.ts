/*
 * @description: human
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-09-03 08:54:08
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-19 08:41:03
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'home',
    component: require('@/views/home/index').default,
    children: [
      {
        path: '/human-info',
        name: 'human-info',
        component: require('@/views/home/human-info/index').default
      },
      {
        path: '/project-document',
        name: 'project-document',
        component: require('@/views/home/project-document/index').default
      },
      {
        path: '/editor',
        name: 'editor',
        component: require('@/views/home/editor/index').default
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
