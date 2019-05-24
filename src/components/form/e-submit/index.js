import http from '/src/http.js'
import util from '/src/util.js'

let app = getApp()

Component({
  props: {
    submitUrl: '',
    height: '90rpx',
    refresh: ''
  },

  methods: {
    // 表单校验
    _formValidate() {
      let result = true
      for (let key in this.$page.data) {
        let temp = this.$page.data[key]
        if (temp.id && temp.status) {
          let _result = temp.status === 'error' ? false : true
          result = result && _result
        }
      }
      return result
    },

    // 表单提交
    async submit() {
      if (!this.props.submitUrl) {
        return
      }
      let validateResult = this._formValidate()
      if (!validateResult) {
        util.ddToast('fail', '存在不正确的表单项目')
        return
      }
      let saveForm = {}
      for (let key in this.$page.data) {
        let temp = this.$page.data[key]
        if (temp.id && temp.label && key === temp.id) {
          if (temp.array) {
            saveForm[key] = this.formatSublist(temp.array)
          } else {
            saveForm[key] = temp.value
          }
        }
      }
      if (this.$page.beforeFormSubmit) {
        saveForm = this.$page.beforeFormSubmit(this.$page.data.saveForm, saveForm)
      } else {
        saveForm = Object.assign({}, this.$page.data.saveForm, saveForm)
      }
      util.ddLoader.show('提交中...')
      let options = {
        url: this.props.submitUrl,
        params: [saveForm],
        token: app.globalData.token
      }
      let resp = await http.post(options)
      util.ddLoader.hide()
      if (resp.status === 0) {
        util.ddToast('success', '提交成功!')
        dd.navigateBack({
          delta: 1
        })
      }
      if (this.$page.data.type === 'edit') {
        app.emitter.emit(`${this.props.refresh ? this.props.refresh + 'List_' : ''}refresh`, {
          detail: { listId: this.props.refresh + 'List' }
        })
        app.emitter.emit(`${this.props.refresh ? this.props.refresh + 'Detail_' : ''}refresh`, {
          detail: { detailId: this.props.refresh + 'Detail' }
        })
      } else {
        app.emitter.emit(`${this.props.refresh ? this.props.refresh + 'List_' : ''}refresh`, {
          detail: { listId: this.props.refresh + 'List' }
        })
      }
    },

    // 处理子表数据
    formatSublist(array) {
      let arr = []
      for (let i = 0; i < array.length; i++) {
        let temp = {}
        let item = array[i]
        if (!item) {
          continue
        }
        for (let key in item) {
          temp[key] = item[key].value
        }
        arr.push(temp)
      }
      return arr
    }
  }
})