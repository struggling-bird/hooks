/**
 * Created by yqdong on 2017/8/18.
 * qq: 1013501639
 * @author yqdong
 *
 */
const Client = require('ssh2').Client;
const sshDao = require('../../dao/ssh')

/**
 * 连接远程终端
 * @param order
 * @returns {Promise}
 */
module.exports.ssh = (order) => {
  const client = new Client()
  const nameReg = /\S*$/
  
  return new Promise((resolve, reject) => {
    if (!nameReg.test(order)) {
      reject('命令格式错误')
      return
    }

    const sshName = order.match(nameReg)[0]

    sshDao.getByName(sshName).then(config => {

      client.on('ready', () => {
        resolve(client)
      }).on('error', err => {
        console.log('ssh登录失败', err)
        reject('ssh登录失败')
      }).connect({
        host: config.ip,
        username: config.userName,
        privateKey: require('fs').readFileSync(config.privateKey)
      })

    }).catch(() => {
      reject('ssh配置获取失败')
    })
  })
}
/**
 * 执行脚本命令
 * @param client
 * @param commond
 * @returns {Promise}
 */
module.exports.exec = (client, commond) => {
  return new Promise((resolve, reject) => {
    client.exec(commond, function (err, stream) {
      if (err) {
        reject(err)
        return
      }
      stream.on('close', function(code, signal) {
        resolve()
      }).on('data', function(data) {
        resolve(data.toString())
      }).stderr.on('data', function(data) {
        reject(data.toString())
      });
    })
  })
}