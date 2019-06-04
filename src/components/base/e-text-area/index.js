import util from '/src/util.js'

Component({
  props: {
    model: {},
    onValidate: (value, maxlength) => {
      if (!length || length === -1) {
        return true
      }
      return length >= model.length
    }
  },

  // 挂载方法
  didMount() {
    this.init(this.props.model)
    this.validate(this.props.model.value)
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // setData后校验
    if (prevProps.model.value !== this.props.model.value) {
      this.validate(this.props.model.value)
    }
  },

  methods: {
    // 输入事件同步value
    handleInput: util.debounce(function(event) {
      let value = `${this.path}.value`
      this.$page.setData({
        [value]: event.detail.value
      })
    }, 500),

    // 设置焦点
    handleTap() {
      if (this.props.model.disabled) {
        return
      }
      let focus = `${this.path}.focus`
      this.$page.setData({
        [focus]: true
      })
    },

    // 获取焦点后触发
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

    // 清空输入并获取焦点
    handleClear(event) {
      if (this.props.model.disabled) {
        return
      }
      let value = `${this.path}.value`
      let focus = `${this.path}.focus`
      this.$page.setData({
        [value]: '',
        [focus]: true
      })
    },

    // 补充params的属性
    init(model) {
      // 配置path
      this.path = model.sfi !== undefined ? `bizObj[${model.ci}].children[${model.sfi}][${model.sci}]` : `bizObj[${model.ci}]`
      // textArea对象
      let textArea = {
        value: '',
        label: '',
        status: '',
        focus: false,
        maxlength: -1,
        disabled: false,
        necessary: false,
        autoHeight: true,
        placeholder: model.necessary ? '必填' : '',
        notice: model.maxlength ? `长度不能超过${model.maxlength}` : ''
      }
      // 补全属性
      this.$page.setData({
        [this.path]: Object.assign(textArea, model)
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