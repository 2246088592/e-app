import util from '/src/util.js'

export default (lo) => {
  // 配置过滤对象
  let filterParams = {}
  if (lo.filterParams) {
    for (let key in lo.filterParams) {
      let item = lo.filterParams[key]
      if (item.id && item.label && item.id === key) {
        filterParams[key] = item
      }
    }
  }
  // 配置Page方法
  return Page({
    data: {
      [lo.id]: {
        id: lo.id,
        array: [],
        name: lo.name,
        bindKey: lo.bindKey,
        searchPlaceholder: lo.searchPlaceholder,
        url: lo.url,
        auth: Object.assign({ add: true, delete: true, filter: true, check: true }, lo.auth),
      },
      ...filterParams
    },
    // onload
    onLoad(query) {
      if (query.params) {
        let params = JSON.parse(query.params)
        if (params.searchOptions.bindList === this.data[lo.id].name) {
          let type = `${lo.id}.type`
          let eSearchId = `${lo.id}.eSearchId`
          let _params = `${lo.id}.params`
          let searchAuth = `${lo.id}.searchAuth`
          this.setData({
            [type]: 'search',
            [eSearchId]: params.id,
            [_params]: params.searchOptions.params,
            [searchAuth]: Object.assign({}, this.data[lo.id].auth, params.auth)
          })
        }
      }
      if (lo.navbarOptions) {
        util.setNavigationBar(lo.navbarOptions)
      }
      lo.onLoad ? lo.onLoad.apply(this, arguments) : undefined
      // 进入此列表时的操作
      return lo.beforeEnterList ? lo.beforeEnterList.apply(this, arguments) : undefined
    },
    onTitleClick() {
      lo.onTitleClick ? lo.onTitleClick.apply(this) : undefined
    },
    onPageScroll() {
      lo.onPageScroll ? lo.onPageScroll.apply(this, arguments) : undefined
    },
    onReady() {
      lo.onReady ? lo.onReady.apply(this) : undefined
    },
    onShow() {
      lo.onShow ? lo.onShow.apply(this) : undefined
    },
    onHide() {
      lo.onHide ? lo.onHide.apply(this) : undefined
    },
    onUnload() {
      lo.onUnload ? lo.onUnload.apply(this) : undefined
    },
    onPullDownRefresh() {
      lo.onPullDownRefresh ? lo.onPullDownRefresh.apply(this) : undefined
    },
    onReachBottom() {
      lo.onReachBottom ? lo.onReachBottom.apply(this) : undefined
    },
    onShareAppMessage() {
      lo.onShareAppMessage ? lo.onShareAppMessage.apply(this) : undefined
    },
    // 点击右下角添加按钮时的操作
    beforeEnterForm() {
      return lo.beforeEnterForm ? lo.beforeEnterForm.apply(this, arguments) : undefined
    }
  })
}