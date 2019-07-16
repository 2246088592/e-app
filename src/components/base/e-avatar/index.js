import http from '/src/http/index'
import util from '/src/libs/util.js'

Component({
  props: {
    id: '',
    mode: 'aspectFill'
  },

  didMount() {
    this.getUserInfo()
  },

  didUpdate(prevProps, prevData) {
    if (prevProps.id !== this.props.id) {
      this.getUserInfo()
    }
  },

  methods: {
    getUserInfo() {
      if (!this.props.id || this.data.user) {
        return
      }
      let options = {
        url: '',
        params: { userid: this.props.id }
      }
      http.get(options, { mock: 'userInfo' }).then(res => {
        if (res.status === 0) {
          this.setData({
            user: res.data
          })
        } else {
          util.ddToast('fail', res.message || '获取用户信息失败')
        }
      })
    }
  }
})