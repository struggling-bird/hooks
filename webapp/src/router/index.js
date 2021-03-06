import Router from 'vue-router'

import login from '../module/login/login.vue'
import layout from '../module/layout/main.vue'
import hookList from '../module/hookList/main.vue'
import createHook from '../module/hook/create.vue'
import history from '../module/history/list.vue'
import ssh from '../module/ssh/list.vue'
import initDb from '../module/system/initDb.vue'

const router = new Router({
  routes: [
    {
      path: '/',
      component: layout,
      redirect: {name: 'hookList'},
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
          path: 'ssh',
          name: 'ssh',
          component: ssh
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
      name: 'login',
      component: login
    },
    {
      path: '/initDb',
      name: 'initDb',
      component: initDb
    }
  ],
  mode: 'history'
})

export default router
