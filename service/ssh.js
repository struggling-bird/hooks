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
  },
  /**
   * 查询用户的所有ssh配置
   * @param userId
   * @returns {*}
   */
  query (userId = '') {
    return sshDao.query(userId)
  },
  /**
   * 根据名称删除ssh配置
   * @param userId
   * @param name
   * @returns {*|Promise}
   */
  delByName (userId = '', name = '') {
    return sshDao.delByName(userId, name)
  },
  /**
   * 通过ssh配置名称获取配置详情
   * @param name
   * @returns {*|Promise}
   */
  getByName (name = '') {
    return sshDao.getByName(name)
  }
}

module.exports = sshService