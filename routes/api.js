/**
 * Created by yqdong on 2017/8/22.
 * qq: 1013501639
 * @author yqdong
 *
 */
var express = require('express');
var router = express.Router();

const hookService = require('../service/hook')
const constants = require('./constants')

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next()
})
/**
 * 供外部调用的hook接口
 */
router.post('/:token/:hookId', function (req, res, next) {
  hookService.execCommand(req.params).then(result => {
    res.json({
      status: constants.resCode.SUCCESS,
      data: result
    })
  }).catch(err => {
    res.json({
      status: constants.resCode.ERROR,
      message: err
    })
  })
})

module.exports = router