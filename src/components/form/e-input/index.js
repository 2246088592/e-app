import util from '/src/util.js'

Component({
  props: {
    model: {},
    // 默认的校验方法
    onValidate: (val, maxlength) => {
      if (!maxlength || maxlength === -1) {
        return true
      }
      return maxlength >= val.length
    }
  },
  // 挂载
  didMount() {
    this.init(this.props.model)
    this._validate(this.props.model.value)
  },
  // 更新
  didUpdate(prevProps, prevData) {
    // value变化时校验
    if (prevProps.model.value !== this.props.model.value) {
      this._validate(this.props.model.value)
    }
  },
  methods: {
    // 输入事件同步value
    handleInput: util.debounce(function(event) {
      let value = `${this.props.model.id}.value`
      this.$page.setData({
        [value]: event.detail.value
      })
    }, 500),

    // 设置焦点
    handleTap() {
      let focus = `${this.props.model.id}.focus`
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
      let focus = `${this.props.model.id}.focus`
      this.$page.setData({
        [focus]: false
      })
    },

    // 清空输入并获取焦点
    handleClear(event) {
      let value = `${this.props.model.id}.value`
      let focus = `${this.props.model.id}.focus`
      this.$page.setData({
        [value]: '',
        [focus]: true
      })
    },

    // 初始化model的属性
    init(model) {
      console.log(model)
      // input对象
      let input = {
        path: `bizObj[${model.formIndex}]`,
        type: '',
        value: '',
        label: '',
        status: '',
        focus: false,
        maxlength: -1,
        disabled: false,
        necessary: false,
        placeholder: model.necessary ? '必填' : '',
        notice: model.maxlength ? `长度不能超过${model.maxlength}` : ''
      }
      let path = `${input.path}`
      this.$page.setData({
        [path]: Object.assign(input, model)
      })

      console.log(Object.assign(input, model))
    },

    // 校验方法
    _validate(val) {
      let result = ''
      if (this.props.model.necessary) {
        if (!val) {
          result = 'error'
        } else {
          result = this.props.onValidate(val, this.props.model.maxlength) ? 'success' : 'error'
        }
      } else {
        if (!val) {
          result = ''
        } else {
          result = this.props.onValidate(val, this.props.model.maxlength) ? 'success' : 'error'
        }
      }
      if (this.props.model.status === result) {
        return
      }
      let status = `${this.props.model.id}.status`
      this.$page.setData({
        [status]: result
      })
    }
  }
})