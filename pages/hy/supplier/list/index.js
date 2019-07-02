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
    template: 'supplier', // 模板名称
    array: [
      {
        id: 1,
        code: 'GYS0001',
        name: 'XXXXXX有限公司',
        contact: '王女士',
        phone: '15246154784',
        address: '上海市浦东新区民生路118号滨江万科中心311'
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