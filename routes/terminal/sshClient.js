/**
 * Created by yqdong on 2017/8/18.
 * qq: 1013501639
 * @author yqdong
 *
 */
var Client = require('ssh2').Client;
/**
 * 连接远程终端
 * @param order
 * @returns {Promise}
 */
module.exports.ssh = (order) => {
  const client = new Client()
  //todo need init by order or ssh config
  const host = '192.168.0.15'
  const username = 'root'
  const privateKey = '/Users/yqdong/.ssh/id_rsa'

  return new Promise((resolve, reject) => {
    try {
      client.on('ready', () => {
        resolve(client)
      }).on('error', err => {
        reject(err)
      }).connect({
        host: host,
        username: username,
        privateKey: require('fs').readFileSync(privateKey)
      })
    } catch (error) {
      reject(error)
    }
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
        console.log('命令执行结束')
        resolve()
      }).on('data', function(data) {
        resolve(data.toString())
      }).stderr.on('data', function(data) {
        reject(data.toString())
      });
    })
  })
}