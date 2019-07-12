import listPage from '/src/render/listPage'

let app = getApp()

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

  // // 导航栏配置，title默认为菜单名称
  // navigationBar: {
  //   title: '',
  //   backgroundColor: ''
  // },

  // 搜索框
  searchBar: {
    bindkey: 'wh_name',
    placeholder: '搜索仓库名称'
  },

  // // 请求参数
  // params: {},

  // // 过滤条件
  // filter: [],

  // 业务对象
  bizObj: {
    // 请求地址
    url: 'url',
    // 模板名称
    template: 'wh',
    // 模拟数据
    mock: 'wh',
    // 新增，查看，编辑时跳转路由
    form: '/pages/hy/base/wh/form/index'
  }
})