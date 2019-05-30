// 工具类
import util from '/src/util.js'

// 全局app对象
let app = getApp()

// 初始化业务对象方法
function initBizObj(f, fid) {
  f.bizObj = f.bizObj.map((c, ci) => {
    if (c.component === 'e-subform' && c.subform && c.subform.length) {
      c.subform = c.subform.map((sc, sci) => {
        return { ...sc, ci: ci, fid: fid, sci: sci }
      })
      if (c.children && c.children.length) {
        c.children = c.children.map(sf, sfi => {
          sf = sf.map((sc, sci) => { return { ...sc, ci: ci, sfi: sfi, sci: sci, fid: fid } })
        })
      } else {
        c.children = [c.subform.map((sc, sci) => { return { ...sc, ci: ci, fid: fid, sfi: 0, sci: sci } })]
      }
    }
    return { ...c, ci: ci, fid: fid }
  })
  return f.bizObj
}

// 初始化校验函数合集
function initRules(f) {
  // 校验函数集合
  let rules = []
  for (let i = 0; i < f.bizObj.length; i++) {
    let c = f.bizObj[i]
    if (c.validate && typeof c.validate === 'function') {
      rules.push({ fid: this.fid, key: c.key, validate: c.validate })
      continue
    }
    if (c.component === 'e-subform' && c.subform && c.subform.length) {
      for (let j = 0; j < c.subform.length; j++) {
        let sc = c.subform[j]
        if (sc.validate && typeof sc.validate === 'function') {
          rules.push({ fid: this.fid, key: sc.key, validate: sc.validate })
        }
      }
    }
  }
  return rules
}

// 导出formPage渲染函数
export default (f) => {
  return Page({
    // 加载
    onLoad(query) {
      // 定义表单id
      this.fid = `F${this.$viewId}`
      //  判断是否存在业务对象
      if (!f.bizObj.length || !f.bizObj) {
        console.error('表单渲染函数需要配置业务对象')
        return
      }
      // 设置业务对象
      this.setData({
        bizObj: initBizObj(f, this.fid)
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
        app.emitter.on(`${this.fid}`, f.formChange, this)
      }
      // 执行业务onReady
      if (f.onReady) {
        f.onReady.apply(this, arguments)
      }
    },

    // 校验方法
    onRules() {
      return initRules(f)
    },

    // 关闭
    onUnload() {
      // 销毁表单change事件
      if (f.formChange) {
        app.emitter.removeListener(`${this.fid}`, f.formChange, this)
      }
    },

    // 展开其他方法
    ...f.methods
  })
}