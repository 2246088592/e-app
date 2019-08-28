import listPage from '/src/render/listPage'
import http from '/src/http/index.js'
import util from '/src/libs/util.js'

listPage({
  // 自定义数据
  data: {
    dialogStockInVisible: false,
    stockInForm: [
      {
        path: 'stockInForm[0]',
        label: '仓库',
        bindkey: 'wh_name',
        necessary: true
      },
      {
        path: 'stockInForm[1]',
        label: '日期',
        necessary: true
      }
    ]
  },

  // 搜索框
  searchBar: {
    bindkey: 'doc_number',
    placeholder: '搜索采购单号'
  },

  // 业务对象
  bizObj: {
    // 请求地址
    url: '/business/po',
    // 模板名称
    template: 'po',
    // 新增，查看，编辑时跳转路由
    form: '/pages/hy/po/form/index'
  },

  // 加载完成
  onReady() {
    this.getWhs()
  },

  methods: {
    // 入库确认
    itemStockIn(btn, checkedArray) {
      if (!checkedArray.length) {
        util.ddToast({ type: 'fail', text: '请先选择需要入库的采购单' })
        return
      }
      let dialogStockIn = util.getComponentById('stockInForm')
      dialogStockIn.confirm({
        title: '入库确认',
        success: () => {
          let array = []
          for (let i = 0; i < checkedArray.length; i++) {
            if (checkedArray[i].doc_status === 'agree') {
              array.push(checkedArray[i].id)
            }
          }
          let options = {
            url: `/business/stockin-wv?warehouseId=${this.data.stockInForm[0].value.id}`,
            params: array
          }
          http.post(options).then(res => {
            if (res.status === 0) {
              util.ddToast({ type: 'success', text: `${array.length}张采购单入库成功` })
              this.refresh()
              this.checkboxInvisible()
            } else {
              util.ddToast({ type: 'fail', text: res.message || '入库失败' })
            }
          })
        }
      })
    },

    // 删除
    handleListDelete(btn, checkedArray) {
      if (!checkedArray.length) {
        util.ddToast({ type: 'fail', text: '请先选择需要删除的采购单' })
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
            let options = { url: '/business/po', params: array }
            http.delete(options).then(res => {
              if (res.status === 0) {
                util.ddToast({ type: 'success', text: `${array.length}张采购单删除成功` })
                this.refresh()
                this.checkboxInvisible()
              } else {
                util.ddToast({ type: 'fail', text: res.message || '删除失败' })
              }
            })
          }
        }
      })
    },

    // 获取仓库数据
    getWhs() {
      let options = {
        url: '/business/warehouse',
        params: { pageable: true, page: 1, limit: 10000, idField: 'id', sort: 'desc', orderBy: 'create_on' }
      }
      http.get(options).then(res => {
        if (res.status === 0) {
          this.setData({ 'stockInForm[0].array': res.data.items })
        } else {
          util.ddToast({ type: 'fail', text: res.message || '获取仓库列表失败' })
        }
      })
    }
  }
})