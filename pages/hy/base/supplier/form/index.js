import formPage from '/src/render/formPage'

formPage({
  // 提交地址
  url: '/business/supplier',

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
      key: 'code',
      component: 'e-input',
      necessary: true,
      maxlength: 20
    },
    {
      label: '供应商名称',
      key: 'name',
      component: 'e-input',
      necessary: true,
      maxlength: 50
    },
    {
      label: '联系人',
      key: 'contact',
      component: 'e-input',
      maxlength: 20
    },
    {
      label: '电话',
      key: 'tel',
      component: 'e-input',
      maxlength: 20
    },
    {
      label: '地址',
      key: 'address',
      component: 'e-text-area',
      maxlength: 100
    },
    {
      label: '备注',
      key: 'remark',
      component: 'e-text-area',
      maxlength: 200
    }
  ]
})