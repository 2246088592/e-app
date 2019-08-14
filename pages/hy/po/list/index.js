import listPage from '/src/render/listPage'
import http from '/src/http/index.js'
import util from '/src/libs/util.js'

listPage({
  // 搜索框
  searchBar: {
    bindkey: 'doc_number',
    placeholder: '搜索订单编号'
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


  // // 列表加载完成触发，每次加载都触发一次，参数为返回数据
  // afterLoad(data) {
  //   data.items.map(item => {
  //     item.apply_person = [JSON.parse(item.apply_person)]
  //     item.apply_dept = [JSON.parse(item.apply_dept)]
  //     return item
  //   })
  //   return Promise.resolve()
  // },

  methods: {
    // 将请购单转为采购单
    handlePo(btn, checked) {
      if (!checked.length) {
        util.ddToast({ type: 'fail', text: '请先选择需要采购的请购单' })
        return
      }
      dd.confirm({
        title: '温馨提示',
        content: `确认将已勾选的${checked.length}张请购单转入采购单吗?`,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: (res) => {
          if (res.confirm) {
            let options = {
              url: '/business/build-po',
              params: { ids: checked }
            }
            http.post(options).then(res => {
              if (res.status === 0) {
                util.ddToast({ type: 'success', text: '转入采购成功' })
                this.refresh()
              } else {
                util.ddToast({ type: 'fail', text: res.message || '转入采购失败' })
              }
            })
          }
        }
      })
    }
  }
})