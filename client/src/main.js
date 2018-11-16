import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import router from './router/index'
import store from './store/index'
import MatrixClientPeg from './MatrixClientPeg'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Meta)

export const app = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})