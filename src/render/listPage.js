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
      filter: l.filter || []
    },

    // onload
    async onLoad(query) {
      // 判断是否存在业务对象
      if (!l.bizObj) {
        console.error('列表渲染函数需要配置业务对象')
        return
      }
      // 定义列表id
      this.lid = `L${this.$viewId}`
      // 获取对应表单搜索组件
      if (query.esearch) {
        this.esearch = JSON.parse(query.esearch)
      }
      // 初始化菜单信息
      this.menu = await util.getMenu(this.route)
      // 设置导航栏
      if (!l.navigationBar || !l.navigationBar.title) {
        l.navigationBar = Object.assign({}, l.navigationBar, { title: this.menu.menu_name })
      }
      util.setNavigationBar(l.navigationBar)
    },
    // 展开其他方法
    ...l.methods
  })
}