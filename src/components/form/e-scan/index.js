Component({
  props: {
    params: {},
    onValidate: (val, maxlength) => {
      if (!maxlength || maxlength === -1) {
        return true
      }
      return maxlength >= val.length
    }
  },

  // 挂载
  didMount() {
    this._complete(this.props.params)
    this._validate(this.props.params.value)
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // value变化时校验
    if (prevProps.params.value !== this.props.params.value) {
      this._validate(this.props.params.value)
    }
  },

  methods: {
    // 输入事件同步value
    handleInput(event) {
      let value = `${this.props.params.id}.value`
      this.$page.setData({
        [value]: event.detail.value
      })
    },

    // 设置焦点
    handleTap() {
      let focus = `${this.props.params.id}.focus`
      this.$page.setData({
        [focus]: true
      })
    },

    // 获取焦点事件
    handleFocus(event) { },

    // 点击键盘(手机)确认键/回车键
    handleConfirm(event) { },

    // 失去焦点
    handleBlur(event) {
      let focus = `${this.props.params.id}.focus`
      this.$page.setData({
        [focus]: false
      })
    },

    // 扫码
    handleScan(event) {
      dd.scan({
        type: this.props.params.scanType,
        success: (res) => {
          this.handleInput({ detail: { value: res.code } })
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
        value: '',
        label: '',
        status: '',
        focus: false,
        maxlength: -1,
        scanType: 'qr',
        disabled: false,
        necessary: false,
        placeholder: item.necessary ? '必填' : '',
        notice: item.maxlength ? `长度不能超过${item.maxlength}` : ''
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
          result = this.props.onValidate(val, this.props.params.maxlength) ? 'success' : 'error'
        }
      } else {
        if (!val) {
          result = ''
        } else {
          result = this.props.onValidate(val, this.props.params.maxlength) ? 'success' : 'error'
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