import listPage from '/src/render/listPage'

let app = getApp()

listPage({
  // 权限标记，对应按钮的position
  btnPos: {
    normal: 1,
    edit: 2
  },

  // 表单背景
  // background: '',

  // 导航栏配置
  navigationBar: {
    // title会自动设置
    title: '这是一个测试表单',
    backgroundColor: '#108ee9',
  },

  // 搜索框
  searchBar: {
    bindkey: 'name',
    placeholder: '哈哈哈'
  },

  // 请求参数
  params: {
    limit: 30
  },


  // 过滤条件
  filter: [
    {
      path: 'filter[0]',
      label: '单行输入',
      key: 'ask_dept',
      component: 'e-input',
      necessary: true
    }
  ],

  // 业务对象
  bizObj: {
    url: 'url', // 请求地址
    template: 'good', // 模板名称
    mock: 'list', // 模拟数据
    form: '/pages/test/form/index', // 新增，查看，编辑时跳转路由
  },


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
  },

  methods: {
    testAdd() {
      app.emitter.emit(`${this.lid}`, {
        type: 'add',
        data: {
          id: 1,
          good_code: 'GOOG0006',
          good_name: '测试耗材6',
          good_type: '动态添加',
          good_spec: 'SCP-006',
          good_unit: '箱'
        }
      })
    },
    testEdit() {
      app.emitter.emit(`${this.lid}`, {
        type: 'edit',
        index: 0,
        data: {
          id: 1,
          good_code: 'GOOG0006',
          good_name: '测试耗材6',
          good_type: '动态修改',
          good_spec: 'SCP-006',
          good_unit: '箱'
        }
      })
    },
    testRefresh() {
      app.emitter.emit(`${this.lid}`, {
        type: 'refresh'
      })
    }
  }
})