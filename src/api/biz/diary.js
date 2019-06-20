import http from '/src/http/index.js'
import util from '/src/libs/util.js'

// 日志接口
const DIARY_URL = '/dd/diary'

// 获取日志
function getDiary(params, mock) {
  return new Promise((resolve, reject) => {
    let options = {
      url: `${DIARY_URL}?access_token=${getApp().globalData.userInfo.access_token}`,
      params: params
    }
    http.post(options, mock).then(res => {
      if (res.data.errcode === 0) {
        resolve(res.data)
      } else {
        util.ddToast('fail', res.data.errmsg || '获取日志失败')
        reject(res)
      }
    })
  })
}

export {
  getDiary
}