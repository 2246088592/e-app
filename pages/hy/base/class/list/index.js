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
    bindkey: 'item_name',
    placeholder: '搜索分类名称'
  },

  // 业务对象
  bizObj: {
    // 请求地址
    url: '/business/item-class',
    // 模板名称
    template: 'class',
    // 新增，查看，编辑时跳转路由
    form: '/pages/hy/base/class/form/index'
  }
})