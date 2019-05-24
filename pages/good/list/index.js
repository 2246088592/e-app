import listPage from '/src/render/listPage'

listPage({
  id: 'goodList',
  name: 'good',
  bindKey: 'name',
  searchPlaceholder: '根据物品名称搜索',
  url: 'url',
  auth: { add: false, delete: false, filter: true, check: true },
  navbarOptions: {
    title: '物品列表',
  },
  filterParams: {},
  beforeEnterList() {
    this.setData({
      'goodList.array': [
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