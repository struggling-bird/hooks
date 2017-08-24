/**
 * Created by yqdong on 2017/8/23.
 * qq: 1013501639
 * @author yqdong
 *
 */
import {ajax} from '../utils/main'
import {actions, mutations} from './constants/main'

const sshStore = {
  state: {
    list: []
  },
  mutations: {
    [mutations.ssh.updateList] (state, list) {

    },
    [mutations.ssh.add] (state, config) {
      state.list.push(config)
    }
  },
  actions: {
    [actions.ssh.create] (context, param) {
      return new Promise((resolve, reject) => {
        ajax({
          url: '/ssh/create',
          method: 'post',
          data: param
        }).then(res => {
          context.commit(mutations.ssh.add, res.data)
          resolve(res)
        }).catch(() => {
          reject()
        })
      })
    },

    [actions.ssh.query] (context) {
      return new Promise((resolve, reject) => {
        ajax({
          url: '/ssh/query',
          method: 'post'
        }).then(res => {
          context.commit(mutations.ssh.updateList, res.data)
          resolve()
        }).catch(() => {
          reject()
        })
      })
    }
  }
}

export default sshStore
