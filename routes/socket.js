/**
 * Created by yqdong on 2017/8/11.
 * qq: 1013501639
 * @author yqdong
 *
 */
const socketIo = require('socket.io')
const terminal = require('../service/terminal/client')
const sessionMiddleware =require('../middleware/session')

module.exports = {
  init: function (server) {
    var io = socketIo.listen(server)

    io.use((socket, next) => {
      sessionMiddleware(socket.request, socket.request.res, next)
    })

    io.on('connection', function (socket) {
      socket.on('terminal', (data) => {
        terminal.exec(socket, data)
      })
      socket.on('disconnect', reason => {
        console.log('socket closed: ', reason)
        terminal.close(socket)
      })
    })
  }
}