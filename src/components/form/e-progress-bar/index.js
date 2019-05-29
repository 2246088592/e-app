Component({
  props: {
    model: {},
    onValidate: (value) => {
      return true
    }
  },

  // 挂载方法
  didMount() {
    this.init(this.props.model)
    this.validate(this.props.model.value)
  },

  // setData后进行value校验
  didUpdate(prevProps, prevData) {
    if (prevProps.model.value !== this.props.model.value) {
      this.validate(this.props.model.value)
    }
  },

  methods: {
    // 设置value
    handleChange(event) {
      let value = `${this.props.model.path}.value`
      this.$page.setData({
        [value]: event.detail.value
      })
    },

    // 补充params的属性
    init(model) {
      // progress对象
      let progressBar = {
        path: `bizObj[${model.formIndex}]`,
        value: 0,
        label: '',
        status: '',
        notice: '',
        disabled: false,
        necessary: false
      }
      let path = `${progressBar.path}`
      // 补全属性
      model.options = Object.assign({
        unit: '%',
        step: 1,
        min: 0,
        max: 100,
        showValue: false,
        activeColor: '#108ee9',
        backgroundColor: '#ddd',
        handleColor: '#fff'
      }, model.options)
      this.$page.setData({
        [path]: Object.assign(progressBar, model)
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
      let status = `${this.props.model.path}.status`
      this.$page.setData({
        [status]: result
      })
    }
  }
})