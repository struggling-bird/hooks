/**
 * Created by yqdong on 2017/8/23.
 * qq: 1013501639
 * @author yqdong
 *
 */
const sshDao = require('../dao/ssh')

const sshService = {
  /**
   * 创建ssh配置
   * @param userId
   * @param ssh
   * @returns {userId}
   */
  create (userId = '', ssh = {
    name: '',
    ip: '',
    port: '',
    userName: '',
    password: '',
    privateKey: ''
  }) {
    return sshDao.create(userId, ssh)
  }
}

module.exports = sshService