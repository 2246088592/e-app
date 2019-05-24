// 工具类对象
const util = {
  // 合并url和query参数
  formatUrl(url, params) {
    if (JSON.stringify(params) === '{}') {
      return url
    }
    let _url = url + '?'
    for (let key in params) {
      _url += `${key}=${params[key]}&`
    }
    return _url.substr(0, _url.length - 1)
  },

  // 格式化日期
  formatDate(fmt, date) {
    // console.log('匹配规则\ny:年\nM:月\nd:日\nH:时\nm:分\ns:秒\nq:季节\nS:毫秒')
    var o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "H+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S": date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
      }
    return fmt
  },

  // 全局toast
  ddToast(type, text, interval) {
    dd.showToast({
      type: type || 'none',
      content: text || '缺少content',
      duration: interval || 2000,
      success: () => { }
    })
  },

  // 全局alert
  ddAlert(title, content, buttonText) {
    dd.alert({
      title: title || '缺少title',
      content: content || '缺少content',
      buttonText: buttonText || 'OK',
      success: () => { }
    })
  },

  // 暂停函数
  sleep(duration) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, duration)
    })
  },

  // 全局loading
  ddLoader: {
    show: (text) => {
      dd.showLoading({
        content: text || '加载中...',
      })
    },
    hide: () => {
      dd.hideLoading()
    }
  },

  // 设置导航栏
  setNavigationBar(options) {
    dd.setNavigationBar({
      ...options,
      success() { }
    })
  },

  // 深拷贝
  cloneDeep(obj) {
    let temp = {}
    temp = JSON.parse(JSON.stringify(obj))
    return temp
  },

  // 去抖函数
  debounce(func, delay) {
    let timer
    return function() {
      let args = arguments
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay || 1000)
    }
  }
}

export default util
