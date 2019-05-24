export default (_do) => {
  // 配置Page方法
  return Page({
    data: {
      // 详情card、阶段组件、tabs配置
      detailOptions: {
        name: _do.name,
        url: _do.url,
        auth: _do.auth || { edit: false, delete: false },
        params: _do.params || {},
        stateOptions: {
          url: _do.so.url,
          bindKey: _do.so.bindKey,
          stateIndex: _do.so.stateIndex,
          stateText: _do.so.stateText
        },
        tabs: _do.tabs || []
      },
      data: _do.data
    },
    onReady() {
      _do.onReady ? _do.onReady.apply(this, arguments) : undefined
    },
    // 初始化
    onLoad(query) {
      if (query.item) {
        let item = JSON.parse(query.item)
        this.setData({
          'detailOptions.item': item
        })
      }
      _do.onLoad ? _do.onLoad.apply(this, arguments) : undefined
    },
    // 更新状态前
    beforeUpdateState(saveForm) {
      if (_do.beforeUpdateState) {
        return _do.beforeUpdateState.apply(this, [saveForm])
      }
      getApp().emitter.emit('updateStateContinue', { detail: { saveForm: saveForm } })
    },
    // 
    onHide() {
      _do.onHide ? _do.onHide.apply(this, arguments) : undefined
    },
    // 页面卸载时移除事件
    onUnload() {
      _do.onUnload ? _do.onUnload.apply(this, arguments) : undefined
    }
  })
}
