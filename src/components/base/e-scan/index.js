Component({
  props: {
    model: {},
    onValidate: (value, maxlength) => {
      if (!maxlength || maxlength === -1) {
        return true
      }
      return maxlength >= value.length
    }
  },

  // 挂载
  didMount() {
    this.init(this.props.model)
    this.validate(this.props.model.value)
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // value变化时校验
    if (prevProps.model.value !== this.props.model.value) {
      this.validate(this.props.model.value)
    }
  },

  methods: {
    // 输入事件同步value
    handleInput(event) {
      let value = `${this.path}.value`
      this.$page.setData({
        [value]: event.detail.value
      })
    },

    // 设置焦点
    handleTap() {
      let focus = `${this.path}.focus`
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
      let focus = `${this.path}.focus`
      this.$page.setData({
        [focus]: false
      })
    },

    // 扫码
    handleScan(event) {
      dd.scan({
        type: this.props.model.scanType,
        success: (res) => {
          this.handleInput({ detail: { value: res.code } })
        }
      })
    },

    // 初始化属性
    init(model) {
      // 配置path
      this.path = model.sfi !== undefined ? `bizObj[${model.ci}].children[${model.sfi}][${model.sci}]` : `bizObj[${model.ci}]`
      // scan对象
      let scan = {
        value: '',
        label: '',
        status: '',
        focus: false,
        maxlength: -1,
        scanType: 'qr',
        disabled: false,
        necessary: false,
        placeholder: model.necessary ? '必填' : '',
        notice: model.maxlength ? `长度不能超过${model.maxlength}` : ''
      }
      // 补全属性
      this.$page.setData({
        [this.path]: Object.assign(scan, model)
      })
    },

    // 校验方法
    validate(value) {
      let result = ''
      if (this.props.model.necessary) {
        if (!value) {
          result = 'error'
        } else {
          result = this.props.onValidate(value, this.props.model.maxlength) ? 'success' : 'error'
        }
      } else {
        if (!value) {
          result = ''
        } else {
          result = this.props.onValidate(value, this.props.model.maxlength) ? 'success' : 'error'
        }
      }
      if (this.props.model.status === result) {
        return
      }
      let status = `${this.path}.status`
      this.$page.setData({
        [status]: result
      })
    }
  }
})