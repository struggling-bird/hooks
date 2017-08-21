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
   running: true
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
  }).catch(error => {
    console.error('ssh连接失败', error)
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
    let res = error
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
  const order = `cd ${data.cwd || ''} && ${data.order} && pwd`

  sshClient.exec(client, order).then(res => {
    response(data.order, res, socket)
  }).catch(err => {
    errorResponse(data.order, err, socket)
  })
}

const response = (order, data, socket) => {
  let reg = /[\n\s]?\S*[\n\s]?$/
  var cwd = data.match(reg)[0].replace(/\n/g, '')
  const response = data.replace(reg, '')

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

module.exports = (socket, data) => {
  const order = data.order
  if (!sshPool[socket.id]) sshPool[socket.id] = socket.id

  if (/^ssh/.test(order)) {
    openSSH(data, socket)
  } else if (sshPool[socket.id] && sshPool[socket.id].running) {
    execInSSH(data, socket, sshPool[socket.id].client)
  } else {
    normalExec(order, socket, data)
  }
}