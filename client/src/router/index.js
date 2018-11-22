import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Dashboard from '../pages/dashboard/index.vue'
import Conversation from '../components/Conversation.vue'
import Profile from '../pages/user/profile.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Setup from '../pages/Setup.vue'
import MatrixClientPeg from "../MatrixClientPeg"
import Config from "../Config"
import {E_NOLOGIN} from "../MatrixClientPeg"
import Forgot from "../pages/Forgot"
import Reset from "../pages/Reset"
import Settings from "../pages/dashboard/Settings"

export const routes = [{
    path: '/',
    name: 'index',
    component: HelloWorld
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/conversation',
    name: 'conversation',
    component: Conversation
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/setup',
    name: 'setup',
    component: Setup
  },
  {
    path: '/reset',
    name: 'reset',
    component: Reset
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: Forgot
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
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
  },
})

router.beforeEach(async (to, from, next) => {
  if (!["login", "register"].includes(to.name)) {
    MatrixClientPeg.attemptToGetLoggedIn();
    try {
      await MatrixClientPeg.getClient();
    } catch (ex) {
      console.error("Failed to authenticate:", ex);
      router.push({name: 'login'});
    }
  }
  await Config.loadResult();
  next();
});

export default router
