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
        step: 1, // 间隔
        min: 0, // 最小值
        max: 100, // 最大值
        value: 0,
        unit: '%', // 单位
        label: '',
        status: '',
        notice: '',
        disabled: false,
        showValue: false, // 是否显示value
        handleColor: '#fff', // 拖动按钮颜色
        activeColor: '#108ee9', // 激活拖动条颜色
        backgroundColor: '#ddd', // 拖动条颜色
      }
      this.$page.setData({
        [this.path]: Object.assign(progressBar, model) // 补全属性
      })
    }
  }
})