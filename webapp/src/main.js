// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import ElementUi from 'element-ui'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import modules from './store/main'

import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(Router)
Vue.use(Vuex)

const store = new Vuex.Store({
  modules
})
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    store.dispatch('getUser').then(() => {
      next()
    }).catch(() => {
      router.push({name: 'login'})
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
