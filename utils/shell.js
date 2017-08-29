/**
 * Created by yqdong on 2017/8/29.
 * qq: 1013501639
 * @author yqdong
 *
 */
const shell = require('shelljs')

const reg = {
  cd: /^cd\s/
}

const terminal = {
  exec (command) {
    if (reg.cd.test(command)) {
      return this.cd(command.replace(/^cd\s*/, ''))
    } else {
      return new Promise((resolve, reject) => {
        shell.exec(command, (code, stdout, stderr) => {
          if (code === 0) {
            resolve(stdout)
          } else {
            reject(stderr)
          }
        })
      })
    }
  },
  execList (list, currentIndex = 0, stdout = '') {
    const context = this
    return new Promise((resolve, reject) => {

      if (list.length && currentIndex < list.length) {
        context.exec(list[currentIndex]).then(out => {
          return context.execList(list, currentIndex + 1, stdout + (out || ''))
        }).then(out => {
          resolve(out)
        }).catch(err => {
          reject(stdout + err)
        })
      } else {
        resolve(stdout)
      }
    })
  },
  cd (dir) {
    return new Promise((resolve, reject) => {
      const res = shell.cd(dir)

      if (res.code === 0) {
        resolve()
      } else {
        reject(res.stderr)
      }
    })
  }
}

module.exports = terminal