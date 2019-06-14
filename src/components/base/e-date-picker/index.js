import util from '/src/libs/util.js'

Component({
  props: {
    model: {},
    // 默认校验方法
    onValidate: (value) => {
      return true
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
    // 打开datepicker
    handleTap(event) {
      if (this.props.model.disabled) {
        return
      }
      dd.datePicker({
        format: this.props.model.format,
        success: (res) => {
          let value = `${this.path}.value`
          this.$page.setData({
            [value]: res.date
          })
        }
      })
    },

    // 初始化model的属性
    init(model) {
      // 配置path
      this.path = model.sfi !== undefined ? `bizObj[${model.ci}].children[${model.sfi}][${model.sci}]` : `bizObj[${model.ci}]`
      // datePicker对象
      let datePicker = {
        value: model.default ? util.formatDate(model.format || 'yyyy-MM-dd', new Date()) : '',
        label: '',
        status: '',
        disabled: false,
        necessary: false,
        format: 'yyyy-MM-dd',
        default: model.default ? model.default : false,
        placeholder: model.necessary ? '必填' : '',
        notice: model.necessary ? '不能为空' : ''
      }
      // 补全属性
      this.$page.setData({
        [this.path]: Object.assign(datePicker, model)
      })
    },

    // 校验方法
    validate(value) {
      let result = ''
      if (this.props.model.necessary) {
        if (!value) {
          result = 'error'
        } else {
          result = this.props.onValidate(value) ? 'success' : 'error'
        }
      } else {
        if (!value) {
          result = ''
        } else {
          result = this.props.onValidate(value) ? 'success' : 'error'
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