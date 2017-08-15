/**
 * Created by yqdong on 2017/8/11.
 * qq: 1013501639
 * @author yqdong
 *
 */
var socketIo = require('socket.io')
var {exec} = require('child_process')

module.exports = {
  init: function (server) {
    var io = socketIo.listen(server)
    io.on('connection', function (socket) {
      socket.on('terminal', (data) => {
        var order = data.order
        exec(order + ' && pwd', {
          cwd: data.cwd || process.cwd()
        }, function (error, stdout, stderr) {
          let response = error
          if (stderr) {
            response = stderr
          } else {
            response = stdout
            let reg = /[\n\s]?\S*[\n\s]?$/
            var cwd = response.match(reg)[0].replace(/\n/g, '')
            response = response.replace(reg, '')
          }
          socket.emit('terminal', {
            order: order,
            response: response,
            cwd
          })
        })
      })

    })
  }
}