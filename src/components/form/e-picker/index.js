import http from '/src/http.js'
import util from '/src/util.js'

let app = getApp()

Component({
  props: {
    params: {},
    onValidate: (val) => {
      return true
    }
  },

  // 挂载方法
  didMount() {
    this._complete(this.props.params)
    this._validate(this.props.params.value)
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // setData后校验
    if (prevProps.params.value !== this.props.params.value) {
      this._validate(this.props.params.value)
    }
    // 搜索条件变化 重新请求选项
    if (JSON.stringify(prevProps.params.pickerOptions.params) !== JSON.stringify(this.props.params.pickerOptions.params)) {
      this._initPicker(this.props.params.pickerOptions)
    }
  },

  methods: {
    // 获取下拉选项
    async _initPicker(pickerOptions) {
      if (!pickerOptions.url) {
        return
      }
      let options = {
        url: pickerOptions.url,
        params: { params: JSON.stringify(pickerOptions.params) }
      }
      let res = await http.get(options)
      if (res.data.status === 0) {
        let array = `${this.props.params.id}.pickerOptions.array`
        this.$page.$spliceData({
          [array]: [0, this.props.params.pickerOptions.array.length, ...res.data.items]
        })
      }
    },

    // 输入框点击事件
    handleTap(event) { },

    // 点击选项事件
    handleChange(event) {
      let i = event.detail.value
      let value = `${this.props.params.id}.value`
      let index = `${this.props.params.id}.pickerOptions.index`
      this.$page.setData({
        [value]: this.props.params.pickerOptions.array[i],
        [index]: i
      })
      app.emitter.emit(`${this.props.params.formId ? this.props.params.formId + '_' : ''}inputChange`, {
        detail: { inputId: this.props.params.id }
      })
    },

    // 补充params的属性
    _complete(item) {
      if (!item.id) {
        console.error('此组件内props接收的参数没有设置id')
        return
      }
      let obj = {
        value: '',
        label: '',
        status: '',
        disabled: false,
        necessary: false,
        placeholder: item.necessary ? '必填' : '',
        notice: item.necessary ? '不能为空' : ''
      }
      let temp = item
      for (let key in obj) {
        if (!temp[key]) {
          temp[key] = obj[key]
        }
      }
      temp.pickerOptions = Object.assign({
        array: [],
        index: -1,
        bindKey: '',
        params: {}
      }, item.pickerOptions)
      let id = `${temp.id}`
      this.$page.setData({
        [id]: temp
      })
      // 初始化完成后请求选项
      this._initPicker(temp.pickerOptions)
    },

    // 校验方法
    _validate(val) {
      let result = ''
      if (this.props.params.necessary) {
        if (!val) {
          result = 'error'
        } else {
          result = this.props.onValidate(val) ? 'success' : 'error'
        }
      } else {
        if (!val) {
          result = ''
        } else {
          result = this.props.onValidate(val) ? 'success' : 'error'
        }
      }
      if (this.props.params.status === result) {
        return
      }
      let status = `${this.props.params.id}.status`
      this.$page.setData({
        [status]: result
      })
    }
  }
})