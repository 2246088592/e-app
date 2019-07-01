import formPage from '/src/render/formPage'

formPage({
  // 权限标记，对应按钮的position
  btnPos: 1,

  // 业务对象
  bizObj: [
    {
      label: '仓库编号',
      key: 'depository_code',
      component: 'e-input',
      necessary: true
    },
    {
      label: '仓库名称',
      key: 'depository_name',
      component: 'e-input',
      necessary: true
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