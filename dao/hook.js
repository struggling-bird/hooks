/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
var db = require('./mysql')
var util = require('../utils/util')
var uuid = require('node-uuid')

const hookDao = {
  /**
   * 添加hook配置
   * @param hook
   * @param user
   * @returns {Promise}
   */
  add (hook, user) {
    const id = util.md5(uuid.v1(), 'hex')
    const sql = `insert into hook(id,name,command,create_time) values('${id}', '${hook.name}', '${encodeURIComponent(hook.command)}', ${Date.now()})`

    return new Promise((resolve, reject) => {
      db.query(sql).then(() => {
        return this.addHookUser(id, user)
      }).then(() => {
        resolve(id)
      }).catch(() => {
        reject()
      })
    })
  },
  /**
   * 添加hook与用户的关系数据
   * @param hookId
   * @param user
   * @returns {*}
   */
  addHookUser (hookId, user) {
    const sql = `insert into hook_user(user_id, hook_id) values('${user.id}', '${hookId}')`
    return db.query(sql)
  },
  /**
   * 通过id获取hook
   * @param id
   * @returns {Promise}
   */
  getById (id) {
    const sql = `select * from hook where id='${id}'`

    return new Promise((resolve, reject) => {
      db.query(sql).then(results => {
        if (results.length === 1) {
          let hook = results[0]
          hook.command = JSON.parse(decodeURIComponent(hook.command))
          resolve(hook)
        } else {
          reject()
        }
      }).catch(() => {
        reject()
      })
    })
  },
  /**
   * 查询用户的所有hook
   * @param user
   * @returns {*}
   */
  query (user) {
    const sql = `select h.* from hook h 
      join hook_user hu on h.id=hu.hook_id 
      join user u on hu.user_id=u.id 
      where u.id = '${user.id}' 
      order by h.create_time desc`
    return new Promise((resolve, reject) => {
      db.query(sql).then(list => {
        resolve(list.map(item => {
          item.command = JSON.parse(decodeURIComponent(item.command))
          return item
        }))
      }).catch(err => {
        console.error('查询hook列表失败', sql, err)
        reject(err)
      })
    })
  },
  /**
   * 通过命令调用获取hook详情
   * @param param
   * @returns {*}
   */
  getByOrder (param = {
    token: '',
    hookId: ''
  }) {
    const sql = `select h.* from hook h 
      join hook_user hu on h.id = hu.hook_id 
      join user u on hu.user_id = u.id 
        where 
      u.token = '${param.token}' and h.id = '${param.hookId}'`

    return new Promise((resolve, reject) => {
      db.query(sql).then(list => {
        resolve(list.map(item => {
          item.command = JSON.parse(decodeURIComponent(item.command))
          return item
        }))
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 删除hook与user关系表数据
   * @param param
   * @returns {*}
   */
  delHookUser (param = {
    userId: '',
    hookId: ''
  }) {
    const sql = `delete from hook_user where user_id = '${param.userId}' and hook_id = '${param.hookId}'`
    return db.query(sql)
  },
  /**
   * 删除指定用户的指定hook配置
   * @param param
   */
  del (param = {
    userId: '',
    hookId: ''
  }) {
    const context = this
    return new Promise((resolve, reject) => {
      context.delHookUser(param).then(() => {
        const sql = `delete from hook where id = '${param.hookId}'`
        return db.query(sql)
      }).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}
module.exports = hookDao