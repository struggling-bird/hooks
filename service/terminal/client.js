/**
 * Created by yqdong on 2017/8/18.
 * qq: 1013501639
 * @author yqdong
 *
 */
const {exec} = require('child_process')
const sshClient = require('./sshClient')

let sshPool = {
  /*[id]: {
   client: null,
   running: true,
   preCwd: '',
   cwd: ''
   }*/
}

/**
 * 打开ssh连接
 * @param order
 * @param socket
 */
const openSSH = (data, socket) => {
  sshClient.ssh(data.order).then(client => {
    sshPool[socket.id] = {
      client: client,
      running: true,
      preCwd: data.cwd || '',
      cwd: ''
    }
    execInSSH({order: 'pwd'}, socket, client)
  }).catch(error => {
    errorResponse(data.order, error, socket)
  })
}
/**
 * 当前机器中执行命令
 * @param order
 * @param socket
 * @param data
 */
const normalExec = (order, socket, data) => {
  exec(order + ' && pwd', {
    cwd: data.cwd || process.cwd()
  }, function (error, stdout, stderr) {
    if (stderr || error) {
      errorResponse(order, stderr || error, socket)
    } else {
      response(order, stdout, socket)
    }
  })
}
/**
 * 远程终端执行命令
 * @param order
 * @param socket
 * @param client
 * @param data
 */
const execInSSH = (data, socket, client) => {
  const sshInstance = sshPool[socket.id]

  if (data.order === 'exit') {
    sshInstance.client.end()
    sshInstance.running = false
    normalExec('pwd', socket, {
      cwd: sshInstance.preCwd
    })
    delete sshPool[socket.id]
    return
  }
  const order = `cd ${sshInstance.cwd || ''};${data.order};pwd`
  sshClient.exec(client, order).then(res => {
    response(data.order, res, socket, true)
  }).catch(err => {
    errorResponse(data.order, err, socket)
  })
}

const response = (order, data, socket, inSSh) => {
  data = data || ''
  let reg = /[\n\s]?\/\S*[\n\s]?$/
  var cwd = data.match(reg) ? data.match(reg)[0].replace(/\n/g, '') : ''
  const response = data.replace(reg, '')

  if (inSSh) {
    sshPool[socket.id].cwd = cwd || sshPool[socket.id].cwd
  }

  socket.emit('terminal', {
    order,
    response,
    cwd
  })

}

const errorResponse = (order, err, socket) => {
  socket.emit('terminal', {
    order,
    response: err.toString()
  })
}

const terminalClient = {
  exec (socket, data) {
    const order = data.order
    const sshInstance = sshPool[socket.id]

    if (/^ssh/.test(order)) {
      openSSH(data, socket)
    } else if (sshInstance && sshInstance.running) {
      execInSSH(data, socket, sshInstance.client)
    } else {
      normalExec(order, socket, data)
    }
  },
  close (socket) {
    const sshInstance = sshPool[socket.id]
    if (sshInstance && sshInstance.running) {
      sshInstance.client.end()
      console.log('ssh连接关闭')
    }
  }
}
module.exports = terminalClient