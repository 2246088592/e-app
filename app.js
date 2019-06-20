import login from '/src/api/sys/login'
const EventEmitter = require('eventemitter3')

App({
  // 实例化eventemitter
  emitter: new EventEmitter(),

  // 全局变量
  globalData: {
    // corpId: 'dingd6e7a1382f29e95f35c2f4657eb6378f',
    // appKey: 'dinghptqfbbrh1qxis5o',
    // agentId: '264238079',
    // 域名，用于发送请求
    host: 'http://dingding.boyo-tech.vaiwan.com'
  },

  // 小程序初始化
  onLaunch(options) {
    // 登录
    login()
  }
})