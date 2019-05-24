import util from '/src/util.js'

// http对象
const http = {
  // 通用get方法
  get(options) {
    return new Promise((resolve, reject) => {
      dd.httpRequest({
        url: `${getApp().globalData.host + options.url}`,
        method: 'GET',
        data: options.params ? options.params : undefined,
        headers: {
          'Authorization': getApp().globalData.token || options.token || undefined
        },
        dataType: options.dataType ? options.dataType : 'json',
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          handleError(err)
          reject(err)
        }
      })
    })
  },

  // 通用post方法
  post(options) {
    return new Promise((resolve, reject) => {
      dd.httpRequest({
        url: `${getApp().globalData.host + options.url}`,
        method: 'POST',
        data: JSON.stringify(options.params ? options.params : undefined),
        headers: {
          'Authorization': getApp().globalData.token || options.token || undefined,
          'Content-Type': 'application/json;charset=UTF-8'
        },
        dataType: options.dataType ? options.dataType : 'json',
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          handleError(err)
          reject(err)
        }
      })
    })
  },

  // 通用delete方法
  delete(options) {
    options.url += '/delete'
    return post(options)
  }
}

// 错误处理方法
function handleError(err) {
  if (err.error === 12) {
    return
  }
  let message = '请求失败'
  if (err.error) {
    switch (err.error) {
      case 4: message = '无权跨域'; break
      case 12: message = '网络出错'; break
      case 13: message = '超时'; break
      case 14: message = '解码失败'; break
      case 19: message = '请求错误'; break
      default: break
    }
  }
  util.ddToast('fail', message)
  console.error(err)
}

export default http