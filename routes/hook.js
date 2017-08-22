/**
 * Created by yqdong on 2017/7/28.
 * qq: 1013501639
 * @author yqdong
 *
 */
var express = require('express');
var router = express.Router();
const hookService = require('../service/hook')
const constants = require('./constants')

/**
 * 创建hook配置
 */
router.post('/create', function (req, res, next) {
  hookService.add(req.body, req.session.user).then(hook => {
    res.json({
      status: constants.resCode.SUCCESS,
      data: hook
    })
  }).catch(() => {
    res.json({
      status: constants.resCode.ERROR,
      message: '创建失败'
    })
  })
})
/**
 * 查询hook配置
 */
router.post('/query', function (req, res, next) {
  hookService.query(req.session.user).then(results => {
    res.json({
      status: constants.resCode.SUCCESS,
      data: results
    })
  }).catch(() => {
    res.json({
      status: constants.resCode.ERROR,
      message: '查询hook列表信息失败'
    })
  })
})
/**
 * 删除hook配置
 */
router.post('/delete', function (req, res, next) {
  if (!req.body.id) {
    res.json({
      status: constants.resCode.PARAM_ERROR,
      message: '缺少参数'
    })
    return
  }
  hookService.del({
    userId: req.session.user.id,
    hookId: req.body.id
  }).then(() => {
    res.json({
      status: constants.resCode.SUCCESS
    })
  }).catch(err => {
    console.error(err)
    res.json({
      status: constants.resCode.ERROR,
      message: '删除失败'
    })
  })
})
/**
 * 编辑hook配置
 */
router.post('/edit', function (req, res, next) {

})

module.exports = router