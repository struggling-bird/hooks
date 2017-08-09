/**
 * Created by yqdong on 2017/7/28.
 * qq: 1013501639
 * @author yqdong
 *
 */
var express = require('express');
var router = express.Router();

/**
 * 供外部调用的hook接口
 */
router.get('/:token/:hookId', function (req, res, next) {

})
/**
 * 创建hook配置
 */
router.post('/create', function (req, res, next) {

})
/**
 * 查询hook配置
 */
router.post('/query', function (req, res, next) {

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