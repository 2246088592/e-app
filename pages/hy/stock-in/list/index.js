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
    template: 'ptsi', // 模板名称
    array: [
      {
        id: 1,
        code: 'RKD0001',
        date: '2019-07-02',
        supplier: 'XXXXXX有限公司',
        depository: '仓库',
        creator: '陈加隆',
        create_date: '2019-07-02',
        sp_person: '刘孟霞',
        sp_date: '2019-07-02'
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