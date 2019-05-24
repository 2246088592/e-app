import util from '/src/util.js'

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
  },

  methods: {
    // 打开datepicker
    handleTap(event) {
      if (this.props.params.disabled) {
        return
      }
      dd.datePicker({
        format: this.props.params.format,
        success: (res) => {
          let value = `${this.props.params.id}.value`
          this.$page.setData({
            [value]: res.date
          })
        }
      })
    },

    // 补充params的属性
    _complete(item) {
      if (!item.id) {
        console.error('此组件内props接收的参数没有设置id')
        return
      }
      let obj = {
        value: item.default ? util.formatDate(item.format || 'yyyy-MM-dd', new Date()) : '',
        label: '',
        status: '',
        disabled: false,
        necessary: false,
        format: 'yyyy-MM-dd',
        default: item.default ? item.default : false,
        placeholder: item.necessary ? '必填' : '',
        notice: item.necessary ? '不能为空' : ''
      }
      let temp = item
      for (let key in obj) {
        if (!temp[key]) {
          temp[key] = obj[key]
        }
      }
      let id = `${temp.id}`
      this.$page.setData({
        [id]: temp
      })
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