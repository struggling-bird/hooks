/**
 * Created by yqdong on 2017/5/3.
 * qq: 1013501639
 * @author yqdong
 * 二次包装axios库，添加返回结果code校验等过滤器功能
 */
import axios from 'axios'
// import util from './util'

export default function (option) {
  return new Promise((resolve, reject) => {
    axios(option).then((res) => {
      if (res.data.status) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch((error) => {
      reject(error)
    })
  })
}
