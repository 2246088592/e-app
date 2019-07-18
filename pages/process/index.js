import http from '/src/http/index.js'
import util from '/src/libs/util.js'

Page({
  data:{
    user:{
      avatar: 'https://static.dingtalk.com/media/lADPDgQ9qTOfb1jNAlfNAlg_600_599.jpg',
      name: '陈加隆',
      userId: '113405601937665838'
    }
  },
  onLoad(query) {
    if (query.form) {
      let form = JSON.parse(query.form)
      let options = {
        url: '',
        params: form
      }
      http.post(options, { mock: 'process' }).then(res => {
        if (res.status === 0) {
          this.setData({
            process: res.data
          })
        } else {
          util.ddToast({ type: 'fail', text: res.message || '获取审批实例失败' })
        }
      })
    }
  }
})