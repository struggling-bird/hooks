/**
 * Created by yqdong on 2017/8/25.
 * qq: 1013501639
 * @author yqdong
 *
 */
const fs = require('fs')
const path = require('path')

const dbUtil = require('../dao/mysql')
const constants = require('../routes/constants')
const util = require('../utils/util')

module.exports = (req, res, next) => {
  if (req.url === '/users/initDbConfig' ||
    dbUtil.checkConfig()//检查数据库配置是否已初始化
  ) {
    next()
  } else {
    util.dbConfigExist().then((config) => {//如果配置文件存在，则按照配置文件进行初始化
      dbUtil.initConfig(config)
      next()
    }).catch(() => {//如果配置文件不存在，则跳转到系统初始化配置页，配置数据库配置信息
      res.json({
        status: constants.resCode.NOT_FOUND_DB_CONFIG,
        message: '数据库配置错误'
      })
    })
  }
}