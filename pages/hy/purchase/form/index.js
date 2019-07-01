import formPage from '/src/render/formPage'

formPage({
  // 权限标记，对应按钮的position
  btnPos: 1,

  // 业务对象
  bizObj: [
    {
      label: '采购单编号',
      key: 'purchase_code',
      component: 'e-input',
      necessary: true
    },
    {
      label: '订单日期',
      key: 'purchase_date',
      component: 'e-date-picker',
      default: true,
      format: 'yyyy-MM-dd'
    },
    {
      label: '供应商',
      key: 'purchase_supplier',
      component: 'e-picker'
    },
    {
      label: '耗材',
      key: 'purchase_goods',
      component: 'e-subform',
      subform: [
        {
          label: '请购单编号',
          key: 'request_code',
          component: 'e-input',
          necessary: true,
          disabled: true
        },
        {
          label: '申请人',
          key: 'request_person',
          component: 'e-input',
          necessary: true,
          disabled: true
        },
        {
          label: '申请部门',
          key: 'request_dept',
          component: 'e-input',
          necessary: true,
          disabled: true
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
          label: '订单数量',
          key: 'good_number',
          component: 'e-input',
          necessary: true
        }
      ]
    },
    {
      label: '制单人',
      key: 'purchase_creator',
      component: 'e-input',
      disabled: true,
    },
    {
      label: '制单日期',
      key: 'purchase_create_date',
      component: 'e-date-picker',
      default: true,
      disabled: true,
      format: 'yyyy-MM-dd'
    },
    {
      label: '审核人',
      key: 'purchase_auditor',
      component: 'e-input',
      disabled: true,
    },
    {
      label: '审核日期',
      key: 'purchase_audit_date',
      component: 'e-date-picker',
      default: true,
      disabled: true,
      format: 'yyyy-MM-dd'
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