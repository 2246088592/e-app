import util from '/src/libs/util.js'

export default (l) => {
  // 配置Page方法
  return Page({
    data: {
      // 权限标记，对应按钮position
      btnPos: l.btnPos !== undefined ? l.btnPos : { normal: '', edit: '' },
      // 业务对象
      bizObj: l.bizObj,
      // 背景
      background: l.background !== undefined ? l.background : '#FFF',
      // 搜索框
      searchBar: l.searchBar !== undefined ? Object.assign({ bindkey: '', placeholder: '搜索' }, l.searchBar) : { bindkey: '', placeholder: '搜索' },
      // 请求参数
      params: l.params || {},
      // 过滤对象
      filter: l.filter || {}
    },

    // onload
    async onLoad(query) {
      // 初始化菜单信息
      this.menu = await util.getMenu(this.route)
      // 定义列表id
      this.lid = `L${this.$viewId}`
      // 判断是否存在业务对象
      if (!l.bizObj) {
        console.error('列表渲染函数需要配置业务对象')
        return
      }
      if (query.esearch) {
        this.esearch = JSON.parse(query.esearch)
      }
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