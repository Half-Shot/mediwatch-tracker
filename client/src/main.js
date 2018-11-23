import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import router from './router'
import store from './store'
import MatrixClientPeg from './MatrixClientPeg'
import VeeValidate from 'vee-validate'
import Notifications from 'vue-notification'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Meta)
Vue.use(VeeValidate)
Vue.use(Notifications)

export const app = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
