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
    const sql = `INSERT INTO ssh (user_id, name, ip, port, user_name, password, private_key) 
      VALUES ('${userId}', '${ssh.name}', '${ssh.ip}', '${ssh.port}', 
      '${ssh.userName}', '${ssh.password}', '${ssh.privateKey}');`

    return new Promise((resolve, reject) => {
      db.query(sql).then(() => {
        return this.getByName(ssh.name)
      }).then(res => {
        resolve(res)
      }).catch(err => {
        console.error('新增ssh配置失败', err)
        reject()
      })
    })
  },
  /**
   * 查询用户的所有ssh配置
   * @param userId
   * @returns {*}
   */
  query (userId = '') {
    const sql = `select * from ssh where user_id = '${userId}'`
    return db.query(sql)
  },
  /**
   * 通过名称查询ssh配置
   * @param name
   * @returns {Promise}
   */
  getByName (name) {
    const sql = `select * from ssh where name = '${name}'`
    return new Promise((resolve, reject) => {
      db.query(sql).then(list => {
        if (list.length === 1) {
          resolve(list[0])
        } else {
          reject()
        }
      }).catch((err) => {
        reject(err)
      })
    })
  },
  /**
   *
   * @param userId
   * @param name
   * @returns {*}
   */
  delByName (userId = '', name = '') {
    const sql = `delete from ssh where name = '${name}' and user_id = '${userId}'`
    return db.query(sql)
  }
}

module.exports = sshDao