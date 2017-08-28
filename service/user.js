/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
const fs = require('fs')

const userDao = require('../dao/user')
const util = require('../utils/util')
const dbUtil = require('../dao/mysql')
const sysConfig = require('../config/sys')

module.exports = {
  /**
   * 获取用户信息
   * @param user
   * @returns {*}
   */
  login (user) {
    return userDao.getUser(user)
  },
  /**
   * 检查系统配置
   * @returns {Promise}
   */
  initDbConfig (config) {
    return new Promise((resolve, reject) => {
      //如果配置已存在，则阻止修改
      if (dbUtil.checkConfig()) {
        reject()
      }
      util.dbConfigExist().then(() => {
        reject()
      }).catch(() => {
        fs.writeFile(sysConfig.dbConfigDir, JSON.stringify(config), err => {
          if (err) {
            reject()
          } else {
            dbUtil.initConfig(config)
            resolve()
          }
        })
      })
    })
  }
}