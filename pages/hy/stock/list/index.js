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
  bizObj: {
    url: 'url', // 请求地址
    template: 'stock', // 模板名称
    array: [
      {
        id: 1,
        depository: 'CK001',
        name: '耗材0001',
        code: 'HC0001',
        spec: 'SCP001',
        number: '30'
      },
      {
        id: 2,
        depository: 'CK001',
        name: '耗材0002',
        code: 'HC0002',
        spec: 'SCP002',
        number: '10'
      },
      {
        id: 3,
        depository: 'CK001',
        name: '耗材0003',
        code: 'HC0002',
        spec: 'SCP002',
        number: '2'
      }
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