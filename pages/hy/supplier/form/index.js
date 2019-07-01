import formPage from '/src/render/formPage'

formPage({
  // 权限标记，对应按钮的position
  btnPos: 1,

  // 业务对象
  bizObj: [
    {
      label: '供应商编号',
      key: 'supplier_code',
      component: 'e-input',
      necessary: true
    },
    {
      label: '供应商名称',
      key: 'supplier_name',
      component: 'e-input',
      necessary: true
    },
    {
      label: '联系人',
      key: 'supplier_contact',
      component: 'e-input'
    },
    {
      label: '电话',
      key: 'supplier_phone',
      component: 'e-input'
    },
    {
      label: '地址',
      key: 'supplier_address',
      component: 'e-text-area',
      maxlength: 500
    }
  ],

  // 表单change事件
  formChange(event) {
    console.log(event)
  },

  // 业务方法
  methods: {

  }
})