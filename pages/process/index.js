import http from '/src/http/index.js'
import util from '/src/libs/util.js'

Page({
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
          util.ddToast('fail', res.message || '获取审批实例失败')
        }
      })
    }
  }
})