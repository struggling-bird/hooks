/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
const userDao = require('../dao/user')
const path = require('path')

module.exports = {
  /**
   * 获取用户信息
   * @param user
   * @returns {*}
   */
  login (user) {
    return userDao.getUser(user)
  },
  /**
   * 检查系统配置
   * @returns {Promise}
   */
  sysCheck () {
    return new Promise((resolve, reject) => {
      fs.exists(path.resolve(__dirname, '../database.config.json'), flag => {
        flag ? resolve() : reject('数据库配置不存在')
      })
    })
  }
}