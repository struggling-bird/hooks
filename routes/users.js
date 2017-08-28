var express = require('express');
var os = require('os')
var router = express.Router();
var constants = require('./constants')
var userService = require('../service/user')

router.post('/login', function(req, res) {
  userService.login({
    name: req.body.name,
    password: req.body.password
  }).then((user) => {
    user.address = os.networkInterfaces().en0[1].address
    req.session.user = user
    res.json({
      status: constants.resCode.SUCCESS,
      data: user
    })
  }).catch(() => {
    res.json({
      status: constants.resCode.ERROR,
      message: '用户名或密码错误'
    })
  })
});

router.post('/getCurrent', (req, res) => {
  var current = req.session.user
  res.json({
    status: current ? constants.resCode.SUCCESS : constants.resCode.INVALID_USER,
    data: current
  })
})

router.post('/logout', (req, res) => {
  delete req.session.user
  res.json({
    status: constants.resCode.SUCCESS
  })
})
/**
 * 检查系统配置：数据库配置
 */
router.post('/sysCheck', (req, res) => {
  userService.sysCheck().then(() => {
    res.json({
      status: constants.resCode.SUCCESS
    })
  }).catch(err => {
    res.json({
      status: constants.resCode.NOT_FOUND_DB_CONFIG,
      message: err.toString()
    })
  })
})
module.exports = router;
