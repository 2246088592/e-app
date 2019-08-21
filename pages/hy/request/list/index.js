import listPage from '/src/render/listPage'
import http from '/src/http/index.js'
import util from '/src/libs/util.js'

listPage({
  // 搜索框
  searchBar: {
    bindkey: 'doc_number',
    placeholder: '搜索请购单号'
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
    handleReceive(btn, checkedArray) {
      if (!checkedArray.length) {
        util.ddToast({ type: 'fail', text: '请先选择需要通知领用的请购单' })
        return
      }
      dd.confirm({
        title: '温馨提示',
        content: `确认通知已勾选的${checkedArray.length}张请购单领用吗?`,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: (res) => {
          if (res.confirm) {
            let options = {
              url: '/business/stockout-wv',
              params: checkedArray
            }
            http.post(options).then(res => {
              if (res.status === 0) {
                util.ddToast({ type: 'success', text: '通知领用成功' })
                this.refresh()
                this.checkboxInvisible()
              } else {
                util.ddToast({ type: 'fail', text: res.message || '通知领用失败' })
              }
            })
          }
        }
      })
    },

    // 将请购单转为采购单
    handlePo(btn, checkedArray) {
      if (!checkedArray.length) {
        util.ddToast({ type: 'fail', text: '请先选择需要采购的请购单' })
        return
      }
      dd.confirm({
        title: '温馨提示',
        content: `确认将已勾选的${checkedArray.length}张请购单转采购吗?`,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: (res) => {
          if (res.confirm) {
            let array = []
            for (let i = 0; i < checkedArray.length; i++) {
              if (checkedArray[i].doc_status === 'agree') {
                array.push(checkedArray[i].id)
              }
            }
            let options = { url: '/business/build-po', params: array }
            http.post(options).then(res => {
              if (res.status === 0) {
                util.ddToast({ type: 'success', text: `${array.length}张请购单转采购成功` })
                this.refresh()
                this.checkboxInvisible()
              } else {
                util.ddToast({ type: 'fail', text: res.message || '转采购失败' })
              }
            })
          }
        }
      })
    },

    // 删除
    handleListDelete(btn, checkedArray) {
      if (!checkedArray.length) {
        util.ddToast({ type: 'fail', text: '请先选择需要删除的项' })
        return
      }
      dd.confirm({
        title: '温馨提示',
        content: `确认删除已勾选的${checkedArray.length}项吗?`,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: (res) => {
          if (res.confirm) {
            let array = []
            for (let i = 0; i < checkedArray.length; i++) {
              if (checkedArray[i].doc_status === 'draft') {
                array.push(checkedArray[i].id)
              }
            }
            let options = { url: '/business/por', params: array }
            http.delete(options).then(res => {
              if (res.status === 0) {
                util.ddToast({ type: 'success', text: `${array.length}张请购单删除成功` })
                this.refresh()
                this.checkboxInvisible()
              } else {
                util.ddToast({ type: 'fail', text: res.message || '删除失败' })
              }
            })
          }
        }
      })
    }
  }
})