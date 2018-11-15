import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
Vue.config.productionTip = false
Vue.use(VueRouter)
// new Vue({
//   render: h => h(App),
// }).$mount('#app')

export const app = new Vue({
  el: '#app',
  render: h => h(App),
  router
})