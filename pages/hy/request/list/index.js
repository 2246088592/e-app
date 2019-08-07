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

  methods: {
    // 新增跳转
    handleAdd1() {
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
        util.ddToast({ type: 'fail', text: '请先选择需要转领用的请购单' })
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
              util.ddToast({ type: 'success', text: res.message || '转领用单成功' })
              this.refresh()
            })
          }
        }
      })
    },

    // 使用请购单生成采购单
    handlePurchase(btn, checked) {
      if (!checked.length) {
        util.ddToast({ type: 'fail', text: '请先选择需要生成采购单的请购单' })
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
              util.ddToast({ type: 'success', text: '生成采购单成功' })
              this.refresh()
            })
          }
        }
      })
    }
  }
})