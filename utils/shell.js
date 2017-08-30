/**
 * Created by yqdong on 2017/8/29.
 * qq: 1013501639
 * @author yqdong
 *
 */
const exec = require('child_process').exec

const reg = {
  cd: /^cd\s/
}

const terminal = {
  /**
   *
   * @param command
   * @param option
   * @returns {*}
   */
  exec (command, option = {
    cwd: process.cwd()
  }) {
    if (reg.cd.test(command)) {
      return this.cd(command, option)
    } else {
      return new Promise((resolve, reject) => {
        exec(command, {
          cwd: option.cwd
        }, (err, stdout, stderr) => {
          if (err || stderr) {
            reject(err || stderr)
          } else {
            resolve(stdout)
          }
        })
      })
    }
  },
  /**
   *
   * @param list
   * @param currentIndex
   * @param stdout
   * @param option
   * @returns {Promise}
   */
  execList (list, currentIndex = 0, stdout = '', option = {
    cwd: process.cwd()
  }) {
    const context = this
    return new Promise((resolve, reject) => {

      if (list.length && currentIndex < list.length) {
        context.exec(list[currentIndex], option).then(out => {
          stdout += out || ''
          return context.execList(list, currentIndex + 1, stdout, option)
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
  /**
   *
   * @param command
   * @param option
   * @returns {Promise}
   */
  cd (command, option = {
    cwd: process.cwd()
  }) {
    return new Promise((resolve, reject) => {
      exec(`${command};pwd;`, {
        cwd: option.cwd
      }, (err, stdout, stderr) => {
        if (err || stderr) {
          reject(err || stderr)
        } else {
          option.cwd = stdout.replace(/\s/g, '')
          resolve()
        }
      })
    })
  }
}

module.exports = terminal

terminal.execList([
  'cd ..',
  'pwd',
  'cd ..',
  'pwd',
  'cd ..',
  'pwd'
]).then(res => {
  console.log('>>>', res)
})