/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
var db = require('./mysql')

module.exports = {
  getUser: function (user) {
    var sql = `select * from user where name='${user.name}' and password='${user.password}'`

    return new Promise((resolve, reject) => {
      db.query(sql).then((result) => {
        if (result.length === 1) {
          resolve(result[0])
        } else {
          reject()
        }
      }).catch(error => {
        reject()
      })
    })
  }
}