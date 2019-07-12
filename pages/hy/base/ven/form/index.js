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
      label: '供应商编号',
      key: 'ven_code',
      component: 'e-input',
      necessary: true
    },
    {
      label: '供应商名称',
      key: 'ven_name',
      component: 'e-input',
      necessary: true
    },
    {
      label: '联系人',
      key: 'ven_contactor',
      component: 'e-input'
    },
    {
      label: '电话',
      key: 'ven_tel',
      component: 'e-input'
    },
    {
      label: '地址',
      key: 'ven_add',
      component: 'e-input'
    }
  ]
})