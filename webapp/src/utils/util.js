/**
 * Created by yqdong on 2017/5/3.
 * qq: 1013501639
 * @author yqdong
 *
 */
const util = {
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
   *
   */
  isEmpty (obj) {
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        return false
      }
    }
    return true
  },
  /**
   * 判断对象是否是null或undefined
   * @param obj
   * @returns {boolean}
   */
  isValid (obj) {
    return obj === null || obj === undefined
  },
  /**
   * 判断两个对象是否相同
   * @param a
   * @param b
   * @returns {boolean}
   */
  isEqual (a = {}, b = {}) {
    return JSON.stringify(a) === JSON.stringify(b)
  },
  /**
   * 合并对象
   * @param defaults
   * @param extend
   * @returns {*}
   */
  mergeObject (defaults = {}, extend = {}) {
    for (let key in defaults) {
      let defaultsProp = defaults[key]
      let extendProp = extend[key]
      if (this.isObject(defaultsProp)) {
        this.mergeObject(defaultsProp, extendProp)
      } else if (this.isArray(defaultsProp)) {
        if (this.isArray(extendProp)) {
          for (let i = 0; i < defaultsProp.length && i < extendProp.length; i++) {
            extendProp[i] = this.mergeObject(defaultsProp[i], extendProp[i])
          }
        } else {
          extend[key] = defaultsProp
        }
      } else {
        extend[key] = this.isValid(extendProp) ? defaultsProp : extendProp
      }
    }
    return extend
  },
  /**
   * 字符串占位符替换
   * @param str
   * @param obj
   * @returns {*}
   */
  strReplace (str, obj) {
    const matchList = str.match(/\{\S*?\}/g) || []
    matchList.forEach((item) => {
      const key = item.replace(/\{|\}/g, '')
      str = str.replace(item, obj[key] || '')
    })
    return str
  },
  /**
   * 从中间拆分字符串,长度超出的话，解析为xxx...xxx
   * @param str
   * @param config
   * @returns {*}
   */
  strMiddleSplit (str, config = {
    maxLength: 20,
    begenLength: 8,
    endLength: 8,
    replaceStr: '...'
  }) {
    str += ''
    var reg = {
      fullCharReg: /[^\x00-\xff]/,
      fullCharsReg: /[^\x00-\xff]/g,
      anyChars: /[\S\s]{1}/g
    }

    var fullCharLength = (str.match(reg.fullCharsReg) || []).length
    var fullLength = str.length + fullCharLength
    var beginArr = []
    var beginLength = 0
    var endArr = []
    var endLength = 0

    if (fullLength > config.maxLength) {
      let strArr = str.match(reg.anyChars)

      strArr.forEach(char => {
        if (beginLength >= config.begenLength) return
        let len = reg.fullCharReg.test(char) ? 2 : 1
        beginLength += len
        beginArr.push(char)
      })

      strArr.reverse().forEach(char => {
        if (endLength >= config.endLength) return
        let len = reg.fullCharReg.test(char) ? 2 : 1
        endLength += len
        endArr.push(char)
      })

      return beginArr.join('') + config.replaceStr + endArr.reverse().join('')
    }

    return str
  },
  /**
   * 为单数前补0
   * @param num
   * @returns {string}
   */
  toDoubleNumber (num) {
    num += ''
    return num > 9 ? num : ('0' + num)
  },
  /**
   * 日期格式化
   * @param date
   * @param formatter
   * @returns {string}
   */
  dateFormat (date = new Date(), formatter = 'yyyy-mm-dd') {
    return formatter.replace('yyyy', date.getFullYear())
      .replace('mm', this.toDoubleNumber(date.getMonth() + 1))
      .replace('dd', this.toDoubleNumber(date.getDate()))
  },
  /**
   * 日期格式化
   * @param date
   * @param formatter
   * @returns {string}
   */
  timeFormat (date = new Date(), formatter = 'hh:mm:ss') {
    return formatter.replace('hh', this.toDoubleNumber(date.getHours()))
      .replace('mm', this.toDoubleNumber(date.getMinutes()))
      .replace('ss', this.toDoubleNumber(date.getSeconds()))
  },
  /**
   * 日期时间格式化
   * @param date
   * @param formatter
   * @returns {string}
   */
  dateTimeFormat (date = new Date(), formatter = 'yyyy-mm-dd hh:mm:ss') {
    formatter = formatter.split('hh')
    return this.dateFormat(date, formatter[0]) + this.timeFormat(date, 'hh' + formatter[1])
  },
  /**
   * xss注入处理
   */
  xssEncode (str) {
    return str.replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
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
  },
  /**
   * 根据指定url和参数对象，转成url格式字符串
   * @param url
   * @param param
   * @returns {string}
   */
  toUrl (url = '', param = {}) {
    var params = []
    var prefix = /\?/.test(url) ? '&' : '?'
    for (let key in param) {
      params.push(`${key}=${param[key]}`)
    }
    return `${url}${prefix}${params.join('&')}`
  },
  /**
   * 将数字转为千分位分割格式
   * @param num
   * @returns {string}
   */
  toThousands (num = 0) {
    var source = String(num).split('.')// 按小数点分成2部分
    source[0] = source[0].match(/\d{1,3}/g).join(',')// 只将整数部分进行都好分割
    return source.join('.')// 再将小数部分合并进来
  },
  clone (obj) {
    if (!this.isObject(obj)) return obj
    return JSON.parse(JSON.stringify(obj))
  },
  isEmptyObj (obj) {
    return JSON.stringify(obj) === '{}'
  }
}

export default util
