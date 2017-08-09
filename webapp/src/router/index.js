import Vue from 'vue'
import Router from 'vue-router'
import ElementUi from 'element-ui'

import login from '../module/login/login.vue'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Router)
Vue.use(ElementUi)

const router = new Router({
  routes: [
    {
      path: '/',
      component: login
    }
  ],
  mode: 'history'
})

export default router
