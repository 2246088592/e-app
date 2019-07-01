import formPage from '/src/render/formPage'

formPage({
  // 权限标记，对应按钮的position
  btnPos: 1,

  // 业务对象
  bizObj: [
    {
      label: '领用单编号',
      key: 'stock_out_code',
      component: 'e-input',
      necessary: true
    },
    {
      label: '申请人',
      key: 'request_person',
      component: 'e-user-chooser',
      necessary: true
    },
    {
      label: '申请部门',
      key: 'request_dept',
      component: 'e-dept-chooser',
      necessary: true
    },
    {
      label: '领用时间',
      key: 'stock_out_date',
      component: 'e-date-picker',
      default: true,
      disabled: true,
      format: 'yyyy-MM-dd'
    },
    {
      label: '申请用途',
      key: 'request_reason',
      component: 'e-text-area',
      maxlength: 500
    },
    {
      label: '耗材',
      key: 'stock_out_goods',
      component: 'e-subform',
      disabled: true,
      subform: [
        {
          label: '请购单编号',
          key: 'purchase_code',
          component: 'e-input',
          necessary: true,
          disabled: true
        },
        {
          label: '请购日期',
          key: 'request_date',
          component: 'e-date-picker',
          default: true,
          disabled: true,
          format: 'yyyy-MM-dd'
        },
        {
          label: '耗材编号',
          key: 'good_code',
          component: 'e-input',
          necessary: true,
          disabled: true
        },
        {
          label: '耗材名称',
          key: 'good_name',
          component: 'e-input',
          necessary: true,
          disabled: true
        },
        {
          label: '规格型号',
          key: 'good_spec',
          component: 'e-input',
          disabled: true
        },
        {
          label: '申请数量',
          key: 'good_spec',
          component: 'e-input',
          necessary: true,
          disabled: true
        },
        {
          label: '单位',
          key: 'good_unit',
          component: 'e-input',
          disabled: true
        },
        {
          label: '领用数量',
          key: 'stock_out_number',
          component: 'e-input',
          necessary: true
        }
      ]
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