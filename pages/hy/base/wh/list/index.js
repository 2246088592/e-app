import listPage from '/src/render/listPage'

listPage({
  // 搜索框
  searchBar: {
    bindkey: 'wh_name',
    placeholder: '搜索仓库名称'
  },

  // 业务对象
  bizObj: {
    // 请求地址
    url: '/business/warehouse',
    // 模板名称
    template: 'wh',
    // 新增，查看，编辑时跳转路由
    form: '/pages/hy/base/wh/form/index'
  }
})