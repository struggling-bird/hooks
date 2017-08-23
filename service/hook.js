/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
const hookDao = require('../dao/hook')
const {exec} = require('child_process')

const hookService = {
  /**
   * 添加hook
   * @param hook
   * @param user
   * @returns {Promise}
   */
  add (hook, user) {
    return new Promise((resolve, reject) => {
      hookDao.add(hook, user).then(id => {
        return hookDao.getById(id)
      }).then(result => {
        resolve(result)
      }).catch(() => {
        reject()
      })
    })
  },
  /**
   * 查询用户的所有hook
   * @param user
   * @returns {Promise}
   */
  query (user) {
    return new Promise((resolve, reject) => {
      hookDao.query(user).then(list => {
        resolve(list.map(item => {
          item.command = JSON.parse(item.command)
          return item
        }))
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  },
  /**
   * 执行指定hook命令
   * @param param
   * @returns {Promise}
   */
  execCommand (param = {
    token: '',
    hookId: ''
  }) {
    return new Promise((resolve, reject) => {

      hookDao.getByOrder(param).then(hooks => {
        if (hooks.length === 1) {
          const hook = hooks[0]
          const command = JSON.parse(hook.command).join(';') + ';exit'

          exec(command, (error, stdout, stderr) => {
            if (error || stderr) {
              reject('命令执行失败')
            } else {
              resolve(stdout)
            }
          })

        } else {
          reject('调用地址不存在')
        }

      }).catch(() => {
        reject('调用失败')
      })

    })
  },
  /**
   * 删除hook
   * @param param
   * @returns {*}
   */
  del (param = {
    userId: '',
    hookId: ''
  }) {
    return hookDao.del(param)
  }
}
module.exports = hookService