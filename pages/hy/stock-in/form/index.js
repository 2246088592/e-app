import formPage from '/src/render/formPage'

formPage({
  // 权限标记，对应按钮的position
  btnPos: 1,

  // 业务对象
  bizObj: [
    {
      label: '入库单编号',
      key: 'stock_in_code',
      component: 'e-input',
      necessary: true
    },
    {
      label: '入库日期',
      key: 'stock_in_date',
      component: 'e-date-picker',
      default: true,
      format: 'yyyy-MM-dd'
    },
    {
      label: '供应商',
      key: 'stock_in_supplier',
      component: 'e-picker'
    },
    {
      label: '入库仓库',
      key: 'stock_in_depository',
      component: 'e-picker',
      necessary: true
    },
    {
      label: '耗材',
      key: 'stock_in_goods',
      component: 'e-subform',
      disabled: true,
      subform: [
        {
          label: '采购单编号',
          key: 'purchase_code',
          component: 'e-input',
          necessary: true,
          disabled: true
        },
        {
          label: '申请人',
          key: 'purchase_person',
          component: 'e-input',
          necessary: true,
          disabled: true
        },
        {
          label: '申请部门',
          key: 'purchase_dept',
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
          necessary: true,
          disabled: true
        },
        {
          label: '入库数量',
          key: 'stock_in_number',
          component: 'e-input',
          necessary: true
        }
      ]
    },
    {
      label: '制单人',
      key: 'stock_in_creator',
      component: 'e-input',
      disabled: true,
    },
    {
      label: '制单日期',
      key: 'stock_in_create_date',
      component: 'e-date-picker',
      default: true,
      disabled: true,
      format: 'yyyy-MM-dd'
    },
    {
      label: '审核人',
      key: 'stock_in_auditor',
      component: 'e-input',
      disabled: true,
    },
    {
      label: '审核日期',
      key: 'stock_in_audit_date',
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