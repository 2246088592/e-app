import listPage from '/src/render/listPage'

listPage({
  id: 'testList',
  name: 'test',
  bindKey: 'name',
  searchPlaceholder: '搜索',
  url: 'url',
  auth: { add: true, delete: true, filter: true, check: true },
  navbarOptions: {
    title: '我发起的审批',
  },
  filterParams: {}
})