/*
 * @description: human
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-09-03 08:54:08
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-10-08 15:16:32
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/components/index.ts'
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/index.scss'
/**
 * @description: marked 代码段高亮
 */
import 'highlight.js/styles/github.css'
Vue.use(ElementUI, { size: 'mini' })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
