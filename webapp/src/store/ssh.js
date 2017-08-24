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
      state.list = list
    },
    [mutations.ssh.add] (state, config) {
      state.list.push(config)
    },
    [mutations.ssh.del] (state, name) {
      for (let i = 0, len = state.list.length; i < len; i++) {
        if (state.list[i].name === name) {
          state.list.splice(i, 1)
          break
        }
      }
    }
  },
  actions: {
    /**
     * 创建ssh配置
     * @param context
     * @param param
     * @returns {Promise}
     */
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
    /**
     * 查询ssh列表
     * @param context
     * @returns {Promise}
     */
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
    },
    [actions.ssh.del] (context, name) {
      return new Promise((resolve, reject) => {
        ajax({
          url: '/ssh/del',
          method: 'post',
          data: {
            name
          }
        }).then(() => {
          context.commit(mutations.ssh.del, name)
          resolve()
        }).catch(() => {
          reject()
        })
      })
    }
  }
}

export default sshStore
