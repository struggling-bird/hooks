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
 * 供外部调用的hook接口
 */
router.get('/:token/:hookId', function (req, res, next) {

})
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

})
/**
 * 编辑hook配置
 */
router.post('/edit', function (req, res, next) {

})

module.exports = router