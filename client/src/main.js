import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import router from './router/index'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Meta)

export const app = new Vue({
  el: '#app',
  render: h => h(App),
  router
})
