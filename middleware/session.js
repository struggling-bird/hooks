/**
 * Created by yqdong on 2017/8/24.
 * qq: 1013501639
 * @author yqdong
 *
 */
const session = require('express-session')
const RedisStore = require("connect-redis")(session);

const sessionMiddleware = session({
  // store: new RedisStore({}),
  secret: 'zhuge hooks system',
  saveUninitialized: true,
  resave: false
})

module.exports = sessionMiddleware