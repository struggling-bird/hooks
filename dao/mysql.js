/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
var mysql = require('mysql')
var config = require('../config/database')
var util = require('../utils/util')

function serialization(results) {
  return results.map(item => {
    return util.toCamelObj(item)
  })
}

module.exports = {
  query: function (sql) {
    var connection = mysql.createConnection(config)

    return new Promise((resolve, reject) => {
      connection.query(sql, function (error, results) {
        if (error) {
          reject(error)
        } else {
          resolve(serialization(results))
        }
      })
      connection.end()
    })
  }
}