/**
 * Created by yqdong on 2017/8/15.
 * qq: 1013501639
 * @author yqdong
 *
 */

import {ajax} from '../utils/main'
import constants from './constants'
export default {
  state: {
    current: {
      id: '',
      name: '',
      token: '',
      email: '',
      password: ''
    }
  },
  mutations: {
    setUser (state, user) {
      state.current = user
    }
  },
  actions: {
    getUser (context) {
      return new Promise((resolve, reject) => {
        ajax({
          url: '/users/getCurrent',
          method: 'post'
        }).then(res => {
          if (res.status === constants.resCode.SUCCESS) {
            context.commit('setUser', res.data)
            resolve()
          } else {
            reject()
          }
        }).catch(() => {
          reject()
        })
      })
    },
    login (context, param = {
      name: '',
      password: ''
    }) {
      return new Promise((resolve, reject) => {
        ajax({
          url: '/users/login',
          method: 'post',
          data: param
        }).then(res => {
          if (res.status === constants.resCode.SUCCESS) {
            context.commit('setUser', res.data)
            resolve()
          } else {
            reject()
          }
        }).catch(res => {
          reject()
        })
      })
    }
  }
}
