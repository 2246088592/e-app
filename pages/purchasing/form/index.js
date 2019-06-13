import formPage from '/src/render/formPage'

formPage({
  // 权限标记，对应按钮的position
  btnPos: 1,

  // 业务对象
  bizObj: [
    {
      label: '单行输入12 3123 12312',
      key: 'ask_dept',
      component: 'e-input',
      necessary: true
    },
    {
      label: '定位',
      key: 'address',
      component: 'e-address',
      necessary: true
    },
    {
      label: '联级选择',
      key: 'ask_type',
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
      label: '日期时间',
      key: 'date',
      component: 'e-date-picker',
      necessary: true
    },
    {
      label: '部门选择',
      key: 'dept',
      component: 'e-dept-chooser',
      necessary: true,
      value: [
        {
          name: '开发部'
        },
        {
          name: '设计部'
        }
      ]
    },
    {
      label: '下拉',
      key: 'picker',
      component: 'e-picker',
      necessary: true,
      options: {
        array: [1, 2, 3, 4, 5, 6]
      }
    },
    {
      label: '滑动条',
      key: 'progress',
      component: 'e-progress-bar',
      necessary: true,
      options: {
        unit: '条',
        showValue: true,
        max: 20,
        step: 2
      }
    },
    {
      label: '扫码',
      key: 'scan',
      component: 'e-scan',
      necessary: true
    },
    {
      label: '搜索',
      key: 'search',
      component: 'e-search',
      options: {
        bindList: 'test',
        bindKey: 'spec'
      },
      necessary: true
    },
    {
      label: '切换',
      key: 'switch',
      component: 'e-switch',
      necessary: true,
      showValue: true
    },
    {
      label: '多行输入',
      key: 'textArea',
      component: 'e-text-area',
      maxlength: 200,
      necessary: true
    },
    {
      label: '人员选择',
      key: 'user',
      component: 'e-user-chooser',
      necessary: true,
      value: [
        {
          name: '陈加隆'
        }
      ]
    },
    {
      label: '子表',
      key: 'goods',
      component: 'e-subform',
      subform: [
        {
          label: '品名',
          key: 'good_name',
          component: 'e-input'
        },
        {
          label: '规格',
          key: 'good_spec',
          component: 'e-input'
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