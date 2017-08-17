var express = require('express');
var os = require('os')
var router = express.Router();
var constants = require('./constants')
var userService = require('../service/user')

router.post('/login', function(req, res, next) {
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

module.exports = router;
