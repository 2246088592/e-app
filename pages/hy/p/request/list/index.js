import listPage from '/src/render/listPage'
import http from '/src/http/index.js'

listPage({
  // 权限标记，对应按钮的position
  btnPos: {
    // 普通模式
    normal: 1,
    // 多选模式
    edit: 12
  },

  // // 表单背景
  // background: '',

  // // 导航栏配置，title默认为菜单名称
  // navigationBar: {
  //   title: '',
  //   backgroundColor: ''
  // },

  // 搜索框
  searchBar: {
    bindkey: 'doc_number',
    placeholder: '搜索单据编号'
  },

  // // 请求参数
  // params: {},

  // // 过滤条件
  // filter: [],

  // 业务对象
  bizObj: {
    // 请求地址
    url: 'url',
    // 模板名称
    template: 'request',
    // 模拟数据
    mock: 'request',
    // 新增，查看，编辑时跳转路由
    form: '/pages/hy/p/request/form/index'
  },

  methods: {
    // 将请购单转为领用单
    handleConvert(btn, checked) {
      if (!checked.length) {
        util.ddToast('fail', '请先选择需要转领用的请购单')
        return
      }
      dd.confirm({
        title: '温馨提示',
        content: `确认将已勾选的${checked.length}请购单转领用单吗?`,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: (res) => {
          if (res.confirm) {
            let options = {
              url: '',
              params: checked
            }
            http.delete(options).then(res => {
              util.ddToast('success', '转领用单成功')
              this.refresh()
            })
          }
        }
      })
    },

    // 使用请购单生成采购单
    handlePurchase(btn, checked) {
      if (!checked.length) {
        util.ddToast('fail', '请先选择需要生成采购单的请购单')
        return
      }
      dd.confirm({
        title: '温馨提示',
        content: `确认用已勾选的${checked.length}请购单生成采购单吗?`,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: (res) => {
          if (res.confirm) {
            let options = {
              url: '',
              params: checked
            }
            http.delete(options).then(res => {
              util.ddToast('success', '生成采购单成功')
              this.refresh()
            })
          }
        }
      })
    }
  }
})