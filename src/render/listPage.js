import util from '/src/libs/util.js'

export default (l) => {
  // 配置过滤对象
  // let filterParams = {}
  // if (lo.filterParams) {
  //   for (let key in lo.filterParams) {
  //     let item = lo.filterParams[key]
  //     if (item.id && item.label && item.id === key) {
  //       filterParams[key] = item
  //     }
  //   }
  // }
  // 配置Page方法
  return Page({
    data: {
      // 权限标记，对应按钮position
      btnPos: l.btnPos !== undefined ? l.btnPos : '',
      // 业务对象
      bizObj: l.bizObj
    },

    // onload
    onLoad(query) {
      // 初始化菜单信息
      if (query.menu) {
        this.menu = JSON.parse(query.menu)
      }
      // 定义列表id
      this.lid = `L${this.$viewId}`
      // if (query.esearch) {
      //   let esearch = JSON.parse(query.esearch)
      //   let type = `${lo.id}.type`
      //   let eSearchId = `${lo.id}.eSearchId`
      //   let _params = `${lo.id}.params`
      //   let searchAuth = `${lo.id}.searchAuth`
      //   this.setData({
      //     [type]: 'search',
      //     [eSearchId]: esearch.cid,
      //     [_params]: esearch.params,
      //     [searchAuth]: Object.assign({}, this.data[lo.id].auth)
      //   })
      // }
      // 设置导航栏
      if (!l.navigationBar || !l.navigationBar.title) {
        l.navigationBar = Object.assign({}, l.navigationBar, { title: this.menu.menu_name })
      }
      util.setNavigationBar(l.navigationBar)
      // 执行业务onLoad
      if (l.onLoad) {
        l.onLoad.apply(this, arguments)
      }
    },
    // onTitleClick() {
    //   lo.onTitleClick ? lo.onTitleClick.apply(this) : undefined
    // },
    // onPageScroll() {
    //   lo.onPageScroll ? lo.onPageScroll.apply(this, arguments) : undefined
    // },
    // onReady() {
    //   lo.onReady ? lo.onReady.apply(this) : undefined
    // },
    // onShow() {
    //   lo.onShow ? lo.onShow.apply(this) : undefined
    // },
    // onHide() {
    //   lo.onHide ? lo.onHide.apply(this) : undefined
    // },
    // onUnload() {
    //   lo.onUnload ? lo.onUnload.apply(this) : undefined
    // },
    // onPullDownRefresh() {
    //   lo.onPullDownRefresh ? lo.onPullDownRefresh.apply(this) : undefined
    // },
    // onReachBottom() {
    //   lo.onReachBottom ? lo.onReachBottom.apply(this) : undefined
    // },
    // onShareAppMessage() {
    //   lo.onShareAppMessage ? lo.onShareAppMessage.apply(this) : undefined
    // },
    // 点击右下角添加按钮时的操作
    // beforeEnterForm() {
    //   return lo.beforeEnterForm ? lo.beforeEnterForm.apply(this, arguments) : undefined
    // }

    // 展开其他方法
    ...l.methods
  })
}