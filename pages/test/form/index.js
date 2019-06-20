import formPage from '/src/render/formPage'

formPage({
  // 权限标记，对应按钮的position
  btnPos: 1,

  // 业务对象
  bizObj: [
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
      mock: 'cascader',
      options: {
        bindKey: 'name'
      }
    },
    // {
    //   label: '日期时间',
    //   key: 'date',
    //   component: 'e-date-picker',
    //   necessary: true
    // },
    // {
    //   label: '部门选择',
    //   key: 'dept',
    //   component: 'e-dept-chooser',
    //   necessary: true
    // },
    // {
    //   label: '单行输入',
    //   key: 'ask_dept',
    //   component: 'e-input',
    //   necessary: true
    // },
    // {
    //   label: '下拉',
    //   key: 'picker',
    //   component: 'e-picker',
    //   necessary: true,
    //   options: {
    //     array: [1, 2, 3, 4, 5, 6]
    //   }
    // },
    // {
    //   label: '滑动条',
    //   key: 'progress',
    //   component: 'e-progress-bar',
    //   necessary: true,
    //   options: {
    //     unit: '条',
    //     showValue: true,
    //     max: 20,
    //     step: 2
    //   }
    // },
    // {
    //   label: '扫码',
    //   key: 'scan',
    //   component: 'e-scan',
    //   necessary: true
    // },
    // {
    //   label: '搜索',
    //   key: 'search',
    //   component: 'e-search',
    //   options: {
    //     bindList: 'test',
    //     bindKey: 'spec'
    //   },
    //   necessary: true
    // },
    // {
    //   label: '切换',
    //   key: 'switch',
    //   component: 'e-switch',
    //   necessary: true,
    //   showValue: true
    // },
    // {
    //   label: '多行输入',
    //   key: 'textArea',
    //   component: 'e-text-area',
    //   maxlength: 200,
    //   necessary: true
    // },
    // {
    //   label: '人员选择',
    //   key: 'user',
    //   component: 'e-user-chooser',
    //   necessary: true,
    //   value: [
    //     {
    //       name: '陈加隆'
    //     }
    //   ]
    // },
    // {
    //   label: '子表',
    //   key: 'goods',
    //   component: 'e-subform',
    //   subform: [
    //     {
    //       label: '品名',
    //       key: 'good_name',
    //       component: 'e-input'
    //     },
    //     {
    //       label: '规格',
    //       key: 'good_spec',
    //       component: 'e-input'
    //     }
    //   ]
    // }
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