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

/**
 * 创建ssh配置
 */
router.post('/create', (req, res) => {
  sshService.create(req.session.user.id, req.body).then((ssh) => {
    res.json({
      status: constants.resCode.SUCCESS,
      data: ssh
    })
  }).catch(() => {
    res.json({
      status: constants.resCode.ERROR,
      message: '创建ssh配置失败'
    })
  })
})
/**
 * 查询ssh配置列表
 */
router.post('/query', (req, res) => {
  sshService.query(req.session.user.id).then(result => {
    res.json({
      status: constants.resCode.SUCCESS,
      data: result
    })
  }).catch(() => {
    res.json({
      status: constants.resCode.ERROR,
      message: '查询ssh配置列表失败'
    })
  })
})

router.post('/del', (req, res) => {
  sshService.delByName(req.session.user.id, req.body.name).then(() => {
    res.json({
      status: constants.resCode.SUCCESS
    })
  }).catch((error) => {
    console.error('删除ssh配置失败', error)
    res.json({
      status: constants.resCode.ERROR,
      message: '删除ssh配置失败'
    })
  })
})

module.exports = router