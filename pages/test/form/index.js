import formPage from '/src/render/formPage'

formPage({
  // 导航栏
  navigationBar: {
    title: '表单组件测试'
  },
  // 业务对象
  bizObj: [
    {
      label: '单行输入',
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
      format: 'yyyy-MM--dd',
      necessary: true
    },
    {
      label: '部门选择',
      key: 'dept',
      component: 'e-dept-chooser',
      necessary: true
    },
    {
      label: '下拉',
      key: 'picker',
      component: 'e-picker',
      necessary: true,
      options: {
        array: [1,2,3,4,5,6]
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
      necessary: true,
      options: {
        bindList: 'test',
        bindKey: 'spec'
      }
    },
    {
      label: '搜索2',
      key: 'search2',
      component: 'e-search',
      necessary: true,
      options: {
        bindList: 'test',
        bindKey: 'name'
      }
    },
    {
      label: '切换',
      key: 'switch',
      component: 'e-switch',
      checked: true,
      trueValue: '12',
      showValue: true
    },
     {
      label: '多行输入',
      key: 'textArea',
      component: 'e-text-area',
      maxlength: 200
    },
    {
      label: '人员选择',
      key: 'user',
      component: 'e-user-chooser',
      necessary: true
    },
  ],

  formChange(event){
    console.log(event)
  }
})