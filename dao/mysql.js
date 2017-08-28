/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
const mysql = require('mysql')
var config = null
const util = require('../utils/util')

const dbUtil = {
  /**
   * 格式化sql查询结果，格式化为驼峰命名规范
   * @param results
   * @returns {*}
   * @private
   */
  _serialization (results) {
    if (!results.map) return results
    return results.map(item => {
      return util.toCamelObj(item)
    })
  },
  initConfig (data) {
    config = data
  },
  /**
   * 检查是否存在数据库配置
   * @returns {boolean}
   */
  checkConfig () {
    return config ? true : false
  },
  /**
   * 执行sql
   * @param sql
   * @returns {Promise}
   */
  query: function (sql) {
    const connection = mysql.createConnection(config)
    const context = this
    return new Promise((resolve, reject) => {
      connection.query(sql, function (error, results) {
        if (error) {
          console.error(sql, error)
          reject(error)
        } else {
          resolve(context._serialization(results))
        }
      })
      connection.end()
    })
  }
}
module.exports = dbUtil