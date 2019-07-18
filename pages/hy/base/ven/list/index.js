import listPage from '/src/render/listPage'

listPage({
  // 权限标记，对应按钮的position
  btnPos: {
    // 普通模式
    normal: 1,
    // 多选模式
    edit: 12
  },

  // // 表单背景
  // background: '',

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
    template: 'ven',
    // 新增，查看，编辑时跳转路由
    form: '/pages/hy/base/ven/form/index'
  }
})