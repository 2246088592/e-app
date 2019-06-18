import validate from '../mixins/validate.js'

Component({
  // 混合校验
  mixins: [validate],
  // 接收参数
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
      let value = `${this.path}.value`
      this.$page.setData({
        [value]: event.detail.value
      })
    },

    // 补充params的属性
    init(model) {
      // 配置path
      this.path = model.path !== undefined ? model.path : ''
      if (model.sfi !== undefined) {
        this.path = `bizObj[${model.ci}].children[${model.sfi}][${model.sci}]`
      } else if (model.ci !== undefined) {
        this.path = `bizObj[${model.ci}]`
      }
      // progress对象
      let progressBar = {
        value: 0,
        label: '',
        status: '',
        notice: '',
        disabled: false,
        notice: ''
      }
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
        [this.path]: Object.assign(progressBar, model)
      })
    }
  }
})