import listPage from '/src/render/listPage'

listPage({
  // 搜索框
  searchBar: {
    bindkey: 'cons_name',
    placeholder: '搜索耗材名称'
  },

  // 业务对象
  bizObj: {
    // 请求地址
    url: '/business/inventory',
    // 模板名称
    template: 'inventory',
    // 新增，查看，编辑时跳转路由
    form: '/pages/hy/base/inventory/form/index'
  }
})