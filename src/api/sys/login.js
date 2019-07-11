import http from '/src/http/index.js'
import util from '/src/libs/util.js'

// 登录接口
const LOGIN_URL = '/dingding/v1/login'

// token刷新接口
const REFRESH_URL = '/uaa/auth/refresh'

// token刷新间隔
const REFRESH_INTERVAL = 900000

// 登录
function login(mock) {
  dd.getAuthCode({
    success: async (res) => {
      let options = {
        url: LOGIN_URL,
        params: { code: res.authCode }
      }

      // // 开始刷新token
      // refreshToken()

      http.get(options, mock).then(res => {
        if (res.status === 0) {
          getApp().globalData.userInfo = res.data
          getApp().globalData.token = res.data.token
          welcome(res.data.dd_user_info.Name)
          dd.switchTab({
            url: '/pages/home/index'
          })
        } else {
          util.ddToast('fail', res.message || '登录失败')
        }
      })
    },
    fail: (err) => {
      console.log(err)
      util.ddToast('fail', '获取免登授权码出错，请联系管理员')
    }
  })
}

// 刷新token
function refreshToken() {
  // 判断刷新器是否存在
  if (!getApp().refresher) {
    getApp().refresher = setInterval(() => {
      let options = {
        url: REFRESH_URL
      }
      http.get(options).then(res => {
        if (res.data.status === 0) {
          getApp().globalData.token = res.data.data.token
        } else {
          util.ddToast('fail', res.data.message || '登录状态刷新失败')
        }
      })
    }, REFRESH_INTERVAL)
  }
}

// 问候方法
function welcome(name) {
  let welcome = ''
  let time = new Date().getHours()
  if (time <= 11) welcome = '早上好'
  else if (time > 11 && time <= 13) welcome = '中午好'
  else if (time > 13 && time <= 18) welcome = '下午好'
  else if (time > 18) welcome = '晚上好'
  util.ddToast('success', `亲爱的${name}，${welcome}`, 3000)
}

export default login