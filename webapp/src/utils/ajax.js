/**
 * Created by yqdong on 2017/5/3.
 * qq: 1013501639
 * @author yqdong
 * 二次包装axios库，添加返回结果code校验等过滤器功能
 */
import axios from 'axios'
import {resCode} from '../store/constants/main'

var router = null

const ajax = (option) => {
  return new Promise((resolve, reject) => {
    axios(option).then((res) => {
      if (res.data.status === resCode.SUCCESS) {
        resolve(res.data)
      } else if (res.data.status === resCode.INVALID_USER) {
        router.push('/login')
      } else if (res.data.status === resCode.NOT_FOUND_DB_CONFIG) {
        router.push('/initDb')
      } else {
        reject(res.data)
      }
    }).catch((error) => {
      reject(error)
    })
  })
}
const initRouter = (route) => {
  router = route
}
export {
  ajax,
  initRouter
}
