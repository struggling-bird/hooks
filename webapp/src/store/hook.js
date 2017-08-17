/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
import {ajax} from '../utils/main'
import {actions, mutations} from './constants/main'

export default {
  state: {
    list: []
  },
  mutations: {
    [mutations.hook.updateList] (state, list) {
      state.list = list
    },
    [mutations.hook.add] (state, hook) {
      state.list.push(hook)
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
          context.commit(mutations.hook.add, res.data)
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },

    [actions.hook.query] (context) {
      return new Promise((resolve, reject) => {
        ajax({
          url: '/hook/query',
          method: 'post'
        }).then(res => {
          context.commit(mutations.hook.updateList, res.data)
          resolve()
        }).catch(() => {
          reject()
        })
      })
    }
  }
}
