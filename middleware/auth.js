/**
 * Created by yqdong on 2017/8/15.
 * qq: 1013501639
 * @author yqdong
 *
 */
var constants = require('../routes/constants')

module.exports = function (req, res, next) {
  if (req.url === '/users/login' ||
    req.url === '/users/initDbConfig' ||
    /^\/api/.test(req.url) ||
    req.session.user
  ) {
    next()
  } else {
    res.json({
      status: constants.resCode.INVALID_USER,
      message: '登录超时'
    })
  }
}