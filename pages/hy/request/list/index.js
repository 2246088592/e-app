import listPage from '/src/render/listPage'
import http from '/src/http/index.js'
import util from '/src/libs/util.js'

listPage({
  // 搜索框
  searchBar: {
    bindkey: 'doc_number',
    placeholder: '搜索单据编号'
  },

  // 业务对象
  bizObj: {
    // 请求地址
    url: '/business/por',
    // 模板名称
    template: 'request',
    // 新增，查看，编辑时跳转路由
    form: '/pages/hy/request/form/index'
  },


  // 列表加载完成触发，每次加载都触发一次，参数为返回数据
  afterLoad(data) {
    data.items.map(item => {
      item.apply_person = [JSON.parse(item.apply_person)]
      item.apply_dept = [JSON.parse(item.apply_dept)]
      return item
    })
    return Promise.resolve()
  },

  methods: {
    // 新增跳转
    handleOpenAdd() {
      if (!this.data.bizObj.form) {
        return
      }
      let list = { lid: this.lid }
      dd.navigateTo({
        url: `${this.data.bizObj.form}?list=${JSON.stringify(list)}`
      })
    },

    // 将请购单转为领用单
    handleConvert(btn, checked) {
      if (!checked.length) {
        util.ddToast({ type: 'fail', text: '请先选择需要通知领用的请购单' })
        return
      }
      dd.confirm({
        title: '温馨提示',
        content: `确认对已勾选的${checked.length}张请购单通知领用吗?`,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: (res) => {
          if (res.confirm) {
            let options = {
              url: '',
              params: checked
            }
            http.delete(options).then(res => {
              if (res.status === 0) {
                util.ddToast({ type: 'success', text: '通知领用成功' })
                this.refresh()
              } else {
                util.ddToast({ type: 'fail', text: res.message || '通知领用失败' })
              }
            })
          }
        }
      })
    }
  }
})