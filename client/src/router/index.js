import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Dashboard from '../components/Dashboard.vue'


export const routes = [{
    path: '/',
    name: 'index',
    component: HelloWorld
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  }
]

export const router = new VueRouter({
  mode: 'history',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router