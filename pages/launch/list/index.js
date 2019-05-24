import listPage from '/src/render/listPage'

listPage({
  id: 'launchList',
  name: 'launch',
  bindKey: 'name',
  searchPlaceholder: '搜索',
  url: 'url',
  auth: { add: false, delete: false, filter: true, check: true },
  navbarOptions: {
    title: '我发起的审批',
  },
  filterParams: {},
  // 假数据
  beforeEnterList() {
    this.setData({
      'launchList.array': [
        {
          ask_person: {
            name: '陈加隆',
            avatar: 'https://static.dingtalk.com/media/lADPDgQ9qTOfb1jNAlfNAlg_600_599.jpg',
          },
          type: '审批单', time: '2019-05-23', pass: true
        },
        {
          ask_person: {
            name: '陈加隆',
            avatar: 'https://static.dingtalk.com/media/lADPDgQ9qTOfb1jNAlfNAlg_600_599.jpg',
          },
          type: '审批单', time: '2019-05-23', pass: false
        }
      ]
    })
  }
})