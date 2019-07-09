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
    console.log('日期格式化匹配规则\ny:年\nM:月\nd:日\nH:时\nm:分\ns:秒\nq:季节\nS:毫秒')
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
      content: text || '空内容',
      duration: interval || 2000,
      fail: (err) => {
        console.error(err)
      }
    })
  },

  // 全局alert
  ddAlert(title, content, buttonText) {
    dd.alert({
      title: title || '警告',
      content: content || '空内容',
      buttonText: buttonText || '确定',
      fail: (err) => {
        console.error(err)
      }
    })
  },

  // 暂停函数
  sleep(duration) {
    return new Promise(resolve => {
      setTimeout(resolve, duration)
    })
  },

  // 全局loading
  ddLoader: {
    show: (text) => {
      dd.showLoading({
        content: text || '加载中...',
        fail: (err) => {
          console.error(err)
        }
      })
    },
    hide: () => {
      dd.hideLoading()
    }
  },

  // 设置导航栏
  setNavigationBar(options) {
    dd.setNavigationBar({
      title: options.title || '空标题',
      reset: options.reset || false,
      backgroundColor: options.backgroundColor || '#FFF',
      fail: (err) => {
        console.error(err)
      }
    })
  },

  // 深拷贝
  cloneDeep(obj) {
    if (typeof obj !== 'object') {
      return obj
    }
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
  },

  // 本地缓存，默认区分用户
  db: {
    // 写
    set({ dbName = 'db', path = '', value = '', user = true }) {
      return new Promise((resolve, reject) => {
        dd.setStorage({
          key: pathInit({ dbName, path, user }),
          data: value,
          success: (result) => {
            resolve(result)
          },
          fail: (err) => {
            reject(err)
          }
        })
      })
    },
    // 读
    get({ dbName = 'db', path = '', defaultValue = '', user = true }) {
      return new Promise((resolve, reject) => {
        dd.getStorage({
          key: pathInit({ dbName, path, user, defaultValue }),
          success: (result) => {
            resolve(result.data)
          },
          fail: (err) => {
            reject(err)
          }
        })
      })
    },
    // 删除
    remove({ dbName = 'db', path = '', user = true }) {
      return new Promise((resolve, reject) => {
        dd.removeStorage({
          key: pathInit({ dbName, path, user }),
          success: (result) => {
            resolve(result)
          },
          fail: (err) => {
            reject(err)
          }
        })
      })
    }
  },

  // 根据当前页面路由获取菜单数据
  getMenu(route) {
    return new Promise((resolve, reject) => {
      this.db.get({ dbName: 'menu', user: true }).then(data => {
        for (let i = 0; i < data.length; i++) {
          let arr = data[i].mobile_url.split(';')
          if (arr.includes(route)) {
            resolve(this.cloneDeep(data[i]))
            break
          }
        }
        resolve(false)
      })
    })
  }
}

// 初始化缓存路径
function pathInit({ dbName = 'db', path = '', user = true, validator = () => true, defaultValue = '' }) {
  const uuid = getApp().globalData.userInfo.id || 'ghost-uuid'
  const currentPath = `${dbName}.${user ? `user.${uuid}` : 'public'}${path ? `.${path}` : ''}`
  const value = dd.getStorageSync({ key: currentPath }).data
  if (!(value !== undefined && validator(value))) {
    dd.setStorageSync({
      key: currentPath,
      data: defaultValue
    })
  }
  return currentPath
}

export default util
