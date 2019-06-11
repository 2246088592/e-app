// 登录函数
import login from '/src/api/sys/login'

// 全局变量
const globalData = {
  // appKey
  appKey: 'dingj7prkry52glpajgm',
  // corpId
  corpId: 'dingd6e7a1382f29e95f35c2f4657eb6378f',
  // agentId
  agentId: '264238079',
  // 是否打印错误信息
  printErrMsg: true,
  // 运行环境
  env: 'DEVELOP',
  // 域名
  host: 'http://8080.boyo.vaiwan.com'
}

// launch初始化
function onLaunch(options) {
  login({ mock: 'login' })
}

// show事件
function onShow(options) { }

// 初始化事件发射器
const EventEmitter = require('eventemitter3')
const emitter = new EventEmitter()

// 保存设备信息
dd.getSystemInfo({
  success: (res) => {
    dd.setStorageSync({
      key: 'systemInfo',
      data: res
    })
  }
})

// 导出
export default {
  globalData,
  onLaunch,
  onShow,
  emitter
}