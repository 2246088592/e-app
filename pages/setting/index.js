
Page({
  data: {
    value: '',
    userinfo: {},
    items: [
      {
        title: '联系客服',
        arrow: true,
      }
    ]
  },

  onLoad(query) {
    this.setData({
      'userinfo': getApp().globalData.userInfo
    })
  },

  handleInput(e){
    this.setData({
      value: e.detail.value
    })
  },

  handleTap(event) {
    let i = event.currentTarget.dataset.itemIndex
    switch (this.data.items[i].title) {
      case '联系客服':
        dd.showCallMenu({
          phoneNumber: '18750105179',
          code: '+86',
          showDingCall: true,
          success: (res) => { },
          fail: (err) => { }
        })
        break
      default:
        break
    }
  }

})