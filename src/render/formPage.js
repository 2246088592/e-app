import util from '/src/util.js'

let app = getApp()

export default (f) => {
  // 配置Page函数
  return Page({
    // 加载
    onLoad(query) {
      // 定义表单id
      let formId = `F${this.$viewId}`
      // 判断是否存在业务对象
      if (!f.bizObj) {
        console.error('表单渲染函数需要配置业务对象')
        return
      }
      // 映射
      let map = {}
      // 设置表单id和业务对象
      this.setData({
        formId: formId,
        // 业务对象第一次初始化
        bizObj: f.bizObj.map((o, i) => {
          return { ...o, formIndex: i, formId: formId }
        })
      })
      // 设置导航栏
      util.setNavigationBar(f.navigationBar)
      // 执行业务onLoad
      if (f.onLoad) {
        f.onLoad.apply(this, arguments)
      }
    },
    // 加载完成
    onReady() {
      // 监听表单change事件
      if (f.formChange) {
        app.emitter.on(`${this.data.formId}`, f.formChange, this)
      }
      // 执行业务onReady
      if (f.onReady) {
        f.onReady.apply(this, arguments)
      }
    },
    // 关闭
    onUnload() {
      // 销毁inputChange
      if (f.formChange) {
        app.emitter.removeListener(`${this.data.formId}`, f.formChange, this)
      }
    },
    // 其他方法
    ...f.methods
  })
}