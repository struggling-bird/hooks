/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
var db = require('./mysql')
var uuid = require('node-uuid')

module.exports = {
  add (hook, user) {
    const id = uuid.v1()
    const sql = `insert into hook(id,name,description,command,create_time) values('${id}', '${hook.name}', '${hook.description}', '${hook.command}', ${Date.now()})`

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
  addHookUser (hookId, user) {
    const sql = `insert into hook_user(user_id, hook_id) values('${user.id}', '${hookId}')`
    return db.query(sql)
  },
  getById (id) {
    const sql = `select * from hook where id='${id}'`

    return new Promise((resolve, reject) => {
      db.query(sql).then(results => {
        if (results.length === 1) {
          resolve(results[0])
        } else {
          reject()
        }
      }).catch(() => {
        reject()
      })
    })
  },
  query (user) {
    const sql = `select h.* from hook h 
      join hook_user hu on h.id=hu.hook_id 
      join user u on hu.user_id=u.id 
      where u.id = ${user.id} 
      order by h.create_time desc`
    return db.query(sql)
  }
}