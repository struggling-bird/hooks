var express = require('express');
var os = require('os')
var router = express.Router();
var constants = require('./constants')
var userService = require('../service/user')
/**
 * 登录
 */
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
  }).catch((err) => {
    console.error(err)
    res.json({
      status: constants.resCode.ERROR,
      message: '用户名或密码错误'
    })
  })
});
/**
 * 获取当前用户信息
 */
router.post('/getCurrent', (req, res) => {
  var current = req.session.user
  res.json({
    status: current ? constants.resCode.SUCCESS : constants.resCode.INVALID_USER,
    data: current
  })
})
/**
 * 退出登录
 */
router.post('/logout', (req, res) => {
  delete req.session.user
  res.json({
    status: constants.resCode.SUCCESS
  })
})

router.post('/initDbConfig', (req, res) => {
  userService.initDbConfig(req.body).then(() => {
    res.json({
      status: constants.resCode.SUCCESS
    })
  }).catch(() => {
    res.json({
      status: constants.resCode.ERROR,
      message: '配置已存在'
    })
  })
})
module.exports = router;
