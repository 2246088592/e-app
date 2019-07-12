import formPage from '/src/render/formPage'
import http from '/src/http/index.js'

formPage({
  // 提交地址
  url: '',

  // 权限标记，对应按钮的position
  // btnPos: 2,

  // // 表单背景
  // background: '',

  // // 导航栏配置，title默认为菜单名称
  // navigationBar: {
  //   title: '',
  //   backgroundColor: ''
  // },

  // 业务对象
  bizObj: [
    {
      label: '仓库编号',
      key: 'wh_number',
      component: 'e-input',
      necessary: true
    },
    {
      label: '仓库名称',
      key: 'wh_name',
      component: 'e-input',
      necessary: true
    }
  ]
})