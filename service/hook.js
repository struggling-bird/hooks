/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
const hookDao = require('../dao/hook')
const sshDao = require('../dao/ssh')
const {exec} = require('child_process')
const Client = require('ssh2').Client

const hookService = {
  /**
   * 添加hook
   * @param hook
   * @param user
   * @returns {Promise}
   */
  add (hook, user) {
    return new Promise((resolve, reject) => {
      hookDao.add(hook, user).then(id => {
        return hookDao.getById(id)
      }).then(result => {
        resolve(result)
      }).catch(() => {
        reject()
      })
    })
  },
  /**
   * 查询用户的所有hook
   * @param user
   * @returns {Promise}
   */
  query (user) {
    return new Promise((resolve, reject) => {
      hookDao.query(user).then(list => {
        resolve(list.map(item => {
          item.command = JSON.parse(decodeURIComponent(item.command))
          return item
        }))
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  },
  /**
   * 执行指定hook命令
   * @param param
   * @returns {Promise}
   */
  execCommand (param = {
    token: '',
    hookId: ''
  }) {
    return new Promise((resolve, reject) => {

      hookDao.getByOrder(param).then(hooks => {
        if (hooks.length === 1) {

          const hook = hooks[0]

          hook.command = JSON.parse(hook.command)
          if (/\bssh\b/.test(hook.command[0])) {

            const sshName = hook.command.splice(0, 1)[0].match(/\S*$/)[0]
            sshDao.getByName(sshName).then(config => {

              const client = new Client()
              client.on('ready', () => {

                let command = hook.command.join(';')
                client.exec(command, function (err, stream) {
                  if (err) {
                    reject(err)
                    return
                  }
                  stream.on('data', function(data) {
                    resolve(data.toString())
                    client.end();
                  }).stderr.on('data', function(data) {
                    reject(data.toString())
                  });
                })

              }).on('error', err => {
                throw err
              }).connect({
                host: config.ip,
                port: config.port,
                username: config.userName,
                password: config.password || undefined,
                privateKey: config.privateKey ? require('fs').readFileSync(config.privateKey) : undefined
              })

            }).catch(err => {
              console.error(`ssh ${sshName}执行错误`, err)
              reject(`ssh ${sshName}执行错误`)
            })


          } else {

            let command = hook.command.join(';')
            exec(command, (error, stdout, stderr) => {
              if (error || stderr) {
                reject(`${command}命令执行失败`)
              } else {
                resolve(stdout)
              }
            })
          }

        } else {
          reject('调用地址不存在')
        }

      }).catch((err) => {
        console.error(err)
        reject('调用失败')
      })

    })
  },
  /**
   * 删除hook
   * @param param
   * @returns {*}
   */
  del (param = {
    userId: '',
    hookId: ''
  }) {
    return hookDao.del(param)
  }
}
module.exports = hookService