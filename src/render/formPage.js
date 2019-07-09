// 工具类
import util from '/src/libs/util.js'

// 全局app对象
let app = getApp()

// 克隆业务对象方法
function cbo(obj) {
  let str = JSON.stringify(obj, (k, v) => {
    if (k === 'validate' && typeof v === 'function') {
      return true
    }
    return v
  })
  return JSON.parse(str)
}

// 初始化业务对象方法
function initBizObj(bizObj, fid) {
  return bizObj.map((c, ci) => {
    if (c.component === 'e-subform' && c.subform && c.subform.length) {
      let newc = { ...cbo(c), ci: ci, fid: fid }
      newc.subform = c.subform.map((sc, sci) => { return { ...cbo(sc), ci: ci, fid: fid, sci: sci } })
      if (c.children && c.children.length) {
        newc.children = c.children.map((sf, sfi) => {
          return sf.map((sc, sci) => { return { ...cbo(sc), ci: ci, sfi: sfi, sci: sci, fid: fid } })
        })
      } else {
        newc.children = [c.subform.map((sc, sci) => {
          return { ...cbo(sc), ci: ci, fid: fid, sfi: 0, sci: sci }
        })]
      }
      return newc
    }
    return { ...cbo(c), ci: ci, fid: fid }
  })
}

// 给表单赋值数据
function initFormData(bizObj, fid, data) {
  return bizObj.map((c, ci) => {
    if (c.component === 'e-subform' && c.subform && c.subform.length) {
      let newc = { ...cbo(c), ci: ci, fid: fid }
      newc.subform = c.subform.map((sc, sci) => { return { ...cbo(sc), ci: ci, fid: fid, sci: sci } })
      newc.children = []
      if (data[newc.key]) {
        for (let sfi = 0; sfi < data[newc.key].length; sfi++) {
          let sf = data[newc.key][sfi]
          newc.children.push(c.subform.map((sc, sci) => {
            let _sc = { ...cbo(sc), ci: ci, fid: fid, sfi: sfi, sci: sci }
            if (sf[_sc.key]) {
              _sc.value = sf[_sc.key]
            }
            return _sc
          }))
        }
      } else {
        newc.children = [c.subform.map((sc, sci) => {
          return { ...cbo(sc), ci: ci, fid: fid, sfi: 0, sci: sci }
        })]
      }
      return newc
    }
    let _c = { ...cbo(c), ci: ci, fid: fid }
    if (data[_c.key]) {
      _c.value = data[_c.key]
    }
    return _c
  })
}

// 初始化校验函数合集
function initRules(f, fid) {
  // 校验函数集合
  let rules = []
  for (let i = 0; i < f.bizObj.length; i++) {
    let c = f.bizObj[i]
    if (c.validate && typeof c.validate === 'function') {
      rules.push({ fid: fid, key: c.key, validate: c.validate })
      continue
    }
    if (c.component === 'e-subform' && c.subform && c.subform.length) {
      for (let j = 0; j < c.subform.length; j++) {
        let sc = c.subform[j]
        if (sc.validate && typeof sc.validate === 'function') {
          rules.push({ fid: fid, key: sc.key, validate: sc.validate })
        }
      }
    }
  }
  return rules
}

// 导出formPage渲染函数
export default (f) => {
  return Page({
    // data对象
    data: {
      // 权限标记，对应按钮position
      btnPos: f.btnPos !== undefined ? f.btnPos : '',
      // 表单背景
      background: f.background !== undefined ? f.background : 'rgba(25, 31, 37, .05)'
    },

    // 加载
    async onLoad(query) {
      // 定义页面菜单
      this.menu = await util.getMenu(`/${this.route}`)
      // 定义表单id
      this.fid = `F${this.$viewId}`
      // 判断是否存在业务对象
      if (!f.bizObj || !f.bizObj.length) {
        console.error('表单渲染函数需要配置业务对象')
        return
      }
      // 设置表单数据
      if (query.data) {
        this.formData = JSON.parse(query.data)
      }
      // 设置业务对象
      if (this.formData) {
        this.setData({
          bizObj: initFormData(f.bizObj, this.fid, this.formData)
        })
      } else {
        this.setData({
          bizObj: initBizObj(f.bizObj, this.fid)
        })
      }
      // 设置导航栏
      if (!f.navigationBar || !f.navigationBar.title) {
        f.navigationBar = Object.assign({}, f.navigationBar, { title: this.menu.menu_name })
      }
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
        app.emitter.on(this.fid, f.formChange, this)
      }
      // 执行业务onReady
      if (f.onReady) {
        f.onReady.apply(this, arguments)
      }
    },

    // 校验方法
    onRules() {
      return initRules(f, this.fid)
    },

    // 关闭
    onUnload() {
      // 销毁表单change事件
      if (f.formChange) {
        app.emitter.removeListener(this.fid, f.formChange, this)
      }
    },

    // 提交方法
    async handleSubmit() {
      console.log(JSON.stringify(this.data.bizObj))
      if (this.beforeSubmit) {
        await this.beforeSubmit()
      }
      if (!this.handleValidate()) {
        return
      }
      let data = this.formatForm()
      console.log(data)
    },

    // 校验提交数据
    handleValidate() {
      let key = ''
      for (let i = 0; i < this.data.bizObj.length; i++) {
        let c = this.data.bizObj[i]
        key = c.label
        if (c.component === 'e-subform') {
          for (let j = 0; j < c.children.length; j++) {
            key += `-${j}`
            let sf = c.children[j]
            for (let k = 0; k < sf.length; k++) {
              if (sf[k].status === 'error') {
                util.ddToast('fail', key + ' ' + sf[k].notice)
                return false
              }
            }
          }
        } else {
          if (c.status === 'error') {
            util.ddToast('fail', key + ' ' + c.notice)
            return false
          }
        }
      }
      return true
    },

    // 整理出可提交的数据
    formatForm() {
      let formatKV = function(arr) {
        let o = {}
        for (let i = 0; i < arr.length; i++) {
          o[arr[i].key] = util.cloneDeep(arr[i].value)
        }
        return o
      }
      let data = {}
      for (let k = 0; k < this.data.bizObj.length; k++) {
        let c = this.data.bizObj[k]
        if (c.component === 'e-subform') {
          data[c.key] = c.children.map(sf => {
            return formatKV(sf)
          })
        } else {
          data[c.key] = util.cloneDeep(c.value)
        }
      }
      return data
    },

    // 展开其他方法
    ...f.methods
  })
}