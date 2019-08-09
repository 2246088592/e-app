import listPage from '/src/render/listPage'

listPage({
  // 搜索框
  searchBar: {
    bindkey: 'name',
    placeholder: '搜索供应商名称'
  },

  // 业务对象
  bizObj: {
    // 请求地址
    url: '/business/supplier',
    // 模板名称
    template: 'supplier',
    // 新增，查看，编辑时跳转路由
    form: '/pages/hy/base/supplier/form/index'
  }
})