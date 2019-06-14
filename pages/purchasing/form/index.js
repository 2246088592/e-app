import formPage from '/src/render/formPage'

formPage({
  // 权限标记，对应按钮的position
  btnPos: 1,

  // 业务对象
  bizObj: [
    {
      label: '申请部门',
      key: 'dept',
      component: 'e-dept-chooser',
      necessary: true
    },
    {
      label: '申请人',
      key: 'user',
      component: 'e-user-chooser',
      necessary: true
    },
    {
      label: '申请时间',
      key: 'date',
      component: 'e-date-picker',
      default: true,
      disabled: true,
      format: 'yyyy-MM-dd HH:mm'
    },
    {
      label: '申请物品',
      key: 'goods',
      component: 'e-subform',
      subform: [
        {
          label: '类型',
          key: 'good_type',
          component: 'e-cascader',
          necessary: true,
          options: {
            bindKey: 'name',
            tree: [
              {
                name: '医用耗材',
                children: [
                  { name: '针头' },
                  { name: '针筒' },
                  { name: '导尿管' },
                  { name: '留置针' },
                  { name: '手套/指套' },
                  { name: '绷带' }
                ]
              },
              {
                name: '办公用品',
                children: [
                  { name: '纸' },
                  { name: '资料册' },
                  { name: '笔' },
                  { name: '夹子' }
                ]
              }
            ]
          }
        },
        {
          label: '品名',
          key: 'search',
          component: 'e-search',
          options: {
            bindList: 'test',
            bindKey: 'spec'
          },
          necessary: true
        },
        {
          label: '建议规格',
          key: 'good_spec',
          component: 'e-input'
        },
        {
          label: '申请数量',
          key: 'good_spec',
          component: 'e-input'
        }
      ]
    },
    {
      label: '申请理由',
      key: 'reason',
      component: 'e-text-area',
      maxlength: 500,
      validate: (val)=>{
        console.log(val)
        return true
      }
    }
  ],

  // 表单change事件
  formChange(event) {
    console.log(event)
  },

  // 业务方法
  methods: {
    handle1(event) {
      console.log(event)
    },
    handle2(event) {
      console.log(event)
    },
    handle3(event) {
      console.log(event)
    }
  }
})