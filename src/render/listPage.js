import util from '/src/libs/util.js'

// 初始化业务对象方法
function initBizObj(bizObj) {
  let obj = {
    url: bizObj.url || '',
    template: bizObj.template || '',
    params: {
      pageable: bizObj.pageable !== undefined ? bizObj.pageable : true,
      page: bizObj.page !== undefined ? bizObj.page : 1,
      limit: bizObj.limit !== undefined ? bizObj.limit : 20,
      idField: bizObj.idField !== undefined ? bizObj.idField : 'id',
      sort: bizObj.sort !== undefined ? bizObj.sort : 'desc',
      orderBy: bizObj.orderBy !== undefined ? bizObj.orderBy : 'id'
    }
  }
  return obj
}

export default (l) => {
  // 配置Page方法
  return Page({
    data: {
      // 权限标记，对应按钮position
      btnPos: l.btnPos !== undefined ? l.btnPos : '',
      editBtnPos: l.editBtnPos !== undefined ? l.editBtnPos : '',
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