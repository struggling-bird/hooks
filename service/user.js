/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
var userDao = require('../dao/user')

module.exports = {
  login (user) {
    return userDao.getUser(user)
  }
}