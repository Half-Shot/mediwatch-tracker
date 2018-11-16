import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import router from './router'
import store from './store'
import MatrixClientPeg from './MatrixClientPeg'
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Meta)
Vue.use(VeeValidate)

MatrixClientPeg.attemptToGetLoggedIn();

export const app = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})