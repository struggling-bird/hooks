import Router from 'vue-router'

import login from '../module/login/login.vue'
import layout from '../module/layout/main.vue'
import hookList from '../module/hookList/main.vue'
import createHook from '../module/hook/create.vue'
import history from '../module/history/list.vue'

const router = new Router({
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        {
          path: 'hook/list',
          name: 'hookList',
          component: hookList
        },
        {
          path: 'hook/create',
          name: 'createHook',
          component: createHook
        },
        {
          path: 'history',
          name: 'history',
          component: history
        }
      ]
    },
    {
      path: '/login',
      component: login
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // todo 判断用户身份，未登录的话，跳转到登录页面
  next()
})

export default router
