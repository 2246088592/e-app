Component({
  didMount() {
    // 初始化水印
    this.initText()
  },

  methods: {
    // 初始化水印方法
    initText() {
      let gd = getApp().globalData
      if (gd.userInfo && gd.userInfo.dd_user_info) {
        this.text = gd.userInfo.dd_user_info.Name + gd.userInfo.dd_user_info.Mobile.substr(-4)
        if (this.text) {
          this.draw()
        }
      }
    },

    draw() {
      let ctx = dd.createCanvasContext('canvas')




      // ctx.style.display='none';
      // ctx.rotate(-20 * Math.PI / 180)
      // ctx.font = "16px Microsoft JhengHei"
      // ctx.fillStyle = "rgba(17, 17, 17, 0.50)"
      // ctx.textAlign = 'left'
      // ctx.textBaseline = 'Middle'
      ctx.fillText(this.text, 100, 100)
     
      console.log(this.text)

      ctx.fill()
      ctx.draw()
    }
  }
})