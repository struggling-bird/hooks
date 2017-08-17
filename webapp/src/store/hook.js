/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
import {ajax} from '../utils/main'
import {actions} from './constants/main'

export default {
  state: {
    list: []
  },
  mutations: {
    updateList (state, list) {
      state.list = list
    }
  },
  actions: {
    [actions.hook.create] (context, hook = {
      name: '',
      command: '',
      description: ''
    }) {
      return new Promise((resolve, reject) => {
        ajax({
          url: '/hook/create',
          method: 'post',
          data: hook
        }).then(res => {
          resolve()
        }).catch(() => {
          reject()
        })
      })
    }
  }
}
