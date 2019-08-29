import listPage from '/src/render/listPage'
import http from '/src/http/index.js'
import util from '/src/libs/util.js'

listPage({
  // 搜索框
  searchBar: {
    bindkey: 'doc_number',
    placeholder: '搜索入库单号'
  },

  // 业务对象
  bizObj: {
    // 请求地址
    url: '/business/stockin',
    // 模板名称
    template: 'in',
    // 新增，查看，编辑时跳转路由
    form: '/pages/hy/in/form/index'
  },

  methods: {
    // 删除
    handleListDelete(btn, checkedArray) {
      if (!checkedArray.length) {
        util.ddToast({ type: 'fail', text: '请先选择需要删除的入库单' })
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
            let options = { url: this.data.bizObj.url, params: array }
            http.delete(options).then(res => {
              if (res.status === 0) {
                util.ddToast({ type: 'success', text: `${array.length}张入库单删除成功` })
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