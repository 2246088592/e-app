import http from '/src/http/index.js'
import util from '/src/libs/util.js'

// 权限接口
const PERMISSION_URL = '/dingding/jsapi/login'

// 获取权限
function getPermissions(mock) {
  return new Promise((resolve, reject) => {
    let options = {
      url: PERMISSION_URL
    }
    http.get(options, mock).then(res => {
      if (res.data.status === 0) {
         resolve(res.data)
      } else {
        util.ddToast('fail', res.data.message || '获取权限失败')
        reject(res)
      }
    })
  })
}

export {
  getPermissions
}