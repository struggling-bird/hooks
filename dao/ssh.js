/**
 * Created by yqdong on 2017/8/23.
 * qq: 1013501639
 * @author yqdong
 *
 */
const db = require('./mysql')

const sshDao = {
  /**
   * 创建ssh配置
   * @param userId
   * @param ssh
   * @returns {*}
   */
  create (userId = '', ssh = {
    name: '',
    ip: '',
    port: '',
    userName: '',
    password: '',
    privateKey: ''
  }) {
    const sql = `INSERT INTO 'ssh' ('user_id', 'name', 'ip', 'port', 'user_name', 'password', 'private_key') 
      VALUES ('${userId}', '${ssh.name}', '${ssh.ip}', '${ssh.port}', 
      '${ssh.userName}', '${ssh.password}', '${ssh.privateKey}');`

    return db.query(sql)
  }
}

module.exports = sshDao