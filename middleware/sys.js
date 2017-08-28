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

/**
 * 检查配置文件是否存在
 * @returns {Promise}
 */
const configExist = () => {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, '../database.config.json')

    fs.stat(filePath, (err) => {
      if (err) {
        reject()
      } else {
        const stream = fs.createReadStream(filePath)
        stream.on('data', data => {
          try {
            data = JSON.parse(data.toString())
            resolve(data)
          } catch (err) {
            console.error(`${filePath}文件内容解析失败`, err)
            reject()
          }
        })
      }
    })
  })
}

module.exports = (req, res, next) => {
  if (dbUtil.checkConfig()) {//检查数据库配置是否已初始化
    next()
  } else {
    configExist().then((config) => {//如果配置文件存在，则按照配置文件进行初始化
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