/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
var hookDao = require('../dao/hook')

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
  }
}