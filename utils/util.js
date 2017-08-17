/**
 * Created by yqdong on 2017/8/16.
 * qq: 1013501639
 * @author yqdong
 *
 */
module.exports = {
  type (obj) {
    return Object.prototype.toString.call(obj)
  },
  isObject (obj) {
    return this.type(obj) === '[object Object]'
  },
  isArray (obj) {
    return this.type(obj) === '[object Array]'
  },
  isString (obj) {
    return this.type(obj) === '[object String]'
  },
  isNumber (obj) {
    return this.type(obj) === '[object Number]'
  },
  isDate (obj) {
    return this.type(obj) === '[object Date]'
  },
  isFunction (obj) {
    return this.type(obj) === '[object Function]'
  },
  /**
   * 字符串转为驼峰格式, eg: a_b ==> aB
   * @param str
   * @returns {string}
   */
  toCamel (str = '') {
    var matchArr = str.match(/_\S/g) || []
    matchArr.forEach((item) => {
      str = str.replace(item, item.replace('_', '').toUpperCase())
    })
    return str
  },
  /**
   * 将驼峰格式字符串转化为下划线格式，eg：aB ===> a_b
   * @param str
   * @returns {string}
   */
  toUnderLine (str = '') {
    var matchArr = str.match(/[A-Z]/g) || []
    matchArr.forEach((item) => {
      str = str.replace(item, '_' + item.toLowerCase())
    })
    return str
  },
  /**
   * 转为驼峰命名规范对象
   * @param obj
   * @returns {{}}
   */
  toCamelObj (obj = {}) {
    var result = {}
    for (let key in obj) {
      if (this.isFunction(obj[key])) continue
      result[this.toCamel(key)] = obj[key]
    }
    return result
  },
  /**
   * 转为下划线命名规范对象
   * @param obj
   * @returns {{}}
   */
  toUnderLineObj (obj = {}) {
    var result = {}
    for (let key in obj) {
      if (this.isFunction(obj[key])) continue
      result[this.toUnderLine(key)] = obj[key]
    }
    return result
  }
}