/**
 * Created by yqdong on 2017/8/11.
 * qq: 1013501639
 * @author yqdong
 *
 */
const socketIo = require('socket.io')
const terminal = require('./terminal/client')

module.exports = {
  init: function (server) {
    var io = socketIo.listen(server)
    io.on('connection', function (socket) {

      socket.on('terminal', (data) => {
        terminal(socket, data)
      })

    })
  }
}