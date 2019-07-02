import listPage from '/src/render/listPage'

listPage({
  id: 'testList',
  name: 'good',
  bindKey: 'name',
  searchPlaceholder: '搜索',
  url: 'url',
  auth: { add: true, delete: true, filter: true, check: true },
  

  // 权限标记，对应按钮的position
  btnPos: 1,
  // 业务对象
  bizObj:{
    url: 'url', // 请求地址
    template: 'good', // 模板名称
    array: [
      {
        id: 1,
        good_code: 'GOOG0001',
        good_name: '测试耗材1',
        good_type: '日常用品',
        good_spec: 'SCP-001',
        good_unit: '个'
      },
      {
        id: 2,
        good_code: 'GOOG0002',
        good_name: '测试耗材2',
        good_type: '日常用品',
        good_spec: 'SCP-002',
        good_unit: '盒'
      },
      {
        id: 3,
        good_code: 'GOOG0003',
        good_name: '测试耗材3',
        good_type: '日常用品',
        good_spec: 'SCP-003',
        good_unit: '箱'
      },
    ]
  },


  filterParams: {},
  beforeEnterList() {
    this.setData({
      'testList.array': [
        {
          name: '0.55针头',
          spec: '盒'
        },
        {
          name: '0.6针头',
          spec: '盒'
        },
        {
          name: '0.7针头',
          spec: '盒'
        },
        {
          name: '12号针头',
          spec: '个'
        }
      ]
    })
  }
})