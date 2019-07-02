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
    template: 'request', // 模板名称
    array: [
      {
        id: 1,
        code: 'QGD0001',
        date: '2019-07-02',
        person: {avatar: 'https://static.dingtalk.com/media/lADPDgQ9qTOfb1jNAlfNAlg_600_599.jpg', name: '陈加隆'},
        dept: '开发部',
        remark: '存货不足'
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