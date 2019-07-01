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
      necessary: true,
      disabled: true
    },
    {
      label: '联级选择',
      key: 'ask_type',
      component: 'e-cascader',
      necessary: true,
      bindkey: 'name',
      disabled: true,
      tree: [
        {
          name: '1',
          children: [
            { name: '1-1' },
            { name: '1-2' },
            {
              name: '1-3',
              children: [
                { name: '1-3-1' },
                { name: '1-3-2' },
                { name: '1-3-3' },
                { name: '1-3-4' }
              ]
            }
          ]
        },
        {
          name: '2',
          children: [
            { name: '2-1' },
            { name: '2-2' },
            { name: '2-3' }
          ]
        }
      ]
    },
    {
      label: '日期时间',
      key: 'date',
      icon: 'time',
      component: 'e-date-picker',
      necessary: true,
      disabled: true
    },
    {
      label: '部门选择',
      key: 'dept',
      component: 'e-dept-chooser',
      necessary: true,
      disabled: true
    },
    {
      label: '单行输入',
      key: 'ask_dept',
      component: 'e-input',
      necessary: true,
      disabled: true
    },
    {
      label: '下拉',
      key: 'picker',
      component: 'e-picker',
      necessary: true,
      array: [1, 2, 3, 4, 5],
      disabled: true
    },
    {
      label: '滑动条',
      key: 'progress',
      component: 'e-progress-bar',
      necessary: true,
      showValue: true,
      disabled: true
    },
    {
      label: '扫码',
      key: 'scan',
      component: 'e-scan',
      necessary: true,
      disabled: true
    },
    {
      label: '搜索',
      key: 'search',
      component: 'e-search',
      bindlist: '/pages/test/list/index',
      bindkey: 'name',
      params: {
        minAge: 20
      },
      necessary: true,
      disabled: true
    },
    {
      label: '切换',
      key: 'switch',
      component: 'e-switch',
      showValue: true,
      disabled: true
    },
    {
      label: '多行输入',
      key: 'textArea',
      component: 'e-text-area',
      necessary: true,
      maxlength: 200,
      disabled: true
    },
    {
      label: '人员选择',
      key: 'user',
      component: 'e-user-chooser',
      necessary: true,
      disabled: true
    },
    {
      label: '子表',
      key: 'goods',
      component: 'e-subform',
      subform: [
        {
          label: '子表输入',
          key: 'good_name',
          component: 'e-input'
        },
        {
          label: '子表单选',
          key: 'good_name',
          component: 'e-picker'
        },
        {
          label: '子表日期',
          key: 'good_name',
          component: 'e-date-picker'
        }
      ]
    }
  ],

  // 表单change事件
  formChange(event) {
    let obj = event

    console.log(obj)
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