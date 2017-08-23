/**
 * Created by yqdong on 2017/8/23.
 * qq: 1013501639
 * @author yqdong
 *
 */
const express = require('express');
const router = express.Router();
const sshService = require('../service/ssh')
const constants = require('./constants')

router.post('/create', (req, res) => {
  sshService.create(req.session.user.id, req.body).then(() => {
    res.json({
      status: constants.resCode.SUCCESS
    })
  }).catch(() => {
    res.json({
      status: constants.resCode.ERROR,
      message: '创建ssh配置失败'
    })
  })
})

module.exports = router