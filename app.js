// 登录方法
import login from '/src/api/sys/login'
// 初始化事件发射器
const EventEmitter = require('eventemitter3')
// 工具类
import util from '/src/util.js'

App({
  emitter: new EventEmitter(),
  // 全局变量
  globalData: {
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
  },

  // launch初始化
  onLaunch(options) {
    login({ mock: 'login' })
  }
})