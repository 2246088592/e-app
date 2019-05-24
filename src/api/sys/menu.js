import http from '/src/http.js'
import util from '/src/util.js'

// 菜单树接口
const MENU_TREE_URL = '/dingding/jsapi/login'

// 获取菜单树
function getMenuTree() {
  return new Promise((resolve, reject) => {
    let options = {
      url: MENU_TREE_URL
    }
    http.get(options).then(res => {
      if (res.data.status === 0) {
        resolve(res.data)
      } else {
        util.ddToast('fail', res.data.message || '获取菜单失败')
        reject(res)
      }
    })
  })
}

export {
  getMenuTree
}