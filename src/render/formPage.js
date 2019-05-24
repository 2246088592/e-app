import { RegExp } from './modules/RegExp'
import util from '/src/util.js'

let app = getApp()

export default (fo) => {
  // 配置表单对象
  let formParams = {}
  if (fo.formParams) {
    for (let key in fo.formParams) {
      let item = fo.formParams[key]
      if (item.id && item.label && item.id === key) {
        formParams[key] = item
      }
    }
  }
  // 配置Page函数
  return Page({
    ...RegExp,
    data: {
      id: fo.id,
      ...formParams
    },
    ...fo.functions,
    onLoad(query) {
      let saveForm = {}
      if (query.saveForm) {
        saveForm = JSON.parse(query.saveForm)
        for (let key in saveForm) {
          if (this.data[key]) {
            let value = `${this.data[key].id}.value`
            this.setData({
              [value]: saveForm[key]
            })
          }
        }
      }
      if (fo.navbarOptions && fo.navbarOptions.title) {
        let _options = Object.assign({}, fo.navbarOptions)
        if (saveForm.id && saveForm.version) {
          _options.title += '编辑'
        } else {
          _options.title += '新增'
        }
        util.setNavigationBar(_options)
      }
      if (saveForm.id && saveForm.version) {
        this.setData({
          'saveForm': saveForm,
          'type': 'edit'
        })
      } else {
        this.setData({
          'saveForm': saveForm
        })
      }
      fo.onLoad ? fo.onLoad.apply(this, arguments) : undefined
      // 表单加载后执行
      return fo.afterEnterForm ? fo.afterEnterForm.apply(this, arguments) : undefined
    },
    // 监听inputChange
    onReady() {
      fo.onReady ? fo.onReady.apply(this, arguments) : undefined
      app.emitter.on(`${fo.id ? fo.id + '_' : ''}inputChange`, fo.inputChange, this)
    },
    // 销毁inputChange
    onUnload() {
      app.emitter.removeListener(`${fo.id ? fo.id + '_' : ''}inputChange`, fo.inputChange, this)
    },
    test() {
      console.log(this)
    }
  })
}