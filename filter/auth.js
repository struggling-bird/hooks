/**
 * Created by yqdong on 2017/8/15.
 * qq: 1013501639
 * @author yqdong
 *
 */
var constants = require('../routes/constants')

module.exports = function (req, res, next) {
  if (req.session.user ||
    req.url === '/users/login' ||
    /^\/api/.test(req.url)
  ) {
    next()
  } else {
    res.json({
      status: constants.resCode.INVALID_USER,
      message: '登录超时'
    })
  }
}