/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
const hookDao = require('../dao/hook')
const {exec} = require('child_process')

module.exports = {
  add (hook, user) {
    return new Promise((resolve, reject) => {
      hookDao.add(hook, user).then(id => {
        hookDao.getById(id).then(result => {
          resolve(result)
        })
      }).catch(() => {
        reject()
      })
    })
  },
  query (user) {
    return hookDao.query(user)
  },
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
  }
}