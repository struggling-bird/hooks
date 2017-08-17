/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
var db = require('./mysql')
var uuid = require('node-uuid')

module.exports = {
  add (hook) {
    const id = uuid.v1()
    const sql = `insert into hook(id,name,description,command,create_time) values('${id}', '${hook.name}', '${hook.description}', '${hook.command}', ${Date.now()})`

    return new Promise((resolve, reject) => {
      db.query(sql).then(() => {
        resolve(id)
      }).catch(() => {
        reject()
      })
    })
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
  }
}