// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import ElementUi from 'element-ui'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import modules from './store/main'
import {initRouter} from './utils/ajax'

import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(Router)
Vue.use(Vuex)

initRouter(router)

const store = new Vuex.Store({
  modules
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
