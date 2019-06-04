let app = getApp()

Component({
  props: {
    model: {}
  },

  // 挂载方法
  didMount() {
    this.init(this.props.model)
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // setData后校验
    if (prevProps.model.value !== this.props.model.value) {
      app.emitter.emit(`${this.props.model.formId}`, this.props.model)
    }
  },

  methods: {
    // 切换事件
    switchChange(event) {
      let checked = `${this.path}.checked`
      let value = `${this.path}.value`
      this.$page.setData({
        [checked]: event.detail.value,
        [value]: event.detail.value ? this.props.model.trueValue : this.props.model.falseValue
      })
    },

    // 初始化属性
    init(model) {
      // 删除默认value，依据checked重新设置value
      delete model.value
      // 配置path
      this.path = model.sfi !== undefined ? `bizObj[${model.ci}].children[${model.sfi}][${model.sci}]` : `bizObj[${model.ci}]`
      // switch对象
      let objSwitch = {
        label: '',
        value: model.checked ? model.trueValue !== undefined ? model.trueValue : true : model.falseValue !== undefined ? model.falseValue : false,
        trueValue: true,
        falseValue: false,
        trueLabel: true,
        falseLabel: false,
        disabled: false,
        checked: model.checked !== undefined ? model.checked : false,
        color: '#3296FA',
        showValue: false
      }
      // 补全属性
      this.$page.setData({
        [this.path]: Object.assign(objSwitch, model)
      })
    }
  }
})