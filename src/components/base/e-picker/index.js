import validate from '../mixins/validate.js'
import equal from '../mixins/equal.js'
import clear from '../mixins/clear.js'

Component({
  // 混合
  mixins: [validate, equal, clear],
  // 接收参数
  props: {
    model: {},
    // 默认校验函数
    onValidate: (value) => {
      return true
    }
  },

  // 挂载方法
  didMount() {
    this.init(this.props.model)
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // setData后校验
    if (!this.equal(prevProps.model.value, this.props.model.value)) {
      this.validate(this.props.model.value)
    }
  },

  methods: {
    // 点击选项事件
    handleChange(event) {
      let i = event.detail.value
      let value = `${this.path}.value`
      let index = `${this.path}.index`
      this.$page.setData({
        [value]: this.props.model.array[i],
        [index]: i
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
      // picker
      let picker = {
        index: -1, // 当前选择的选项索引
        array: [], // 选项
        value: '',
        label: '',
        status: '',
        bindkey: '',
        disabled: false,
        necessary: false,
        notice: model.necessary ? '不能为空' : '',
        placeholder: model.necessary ? '必填' : ''
      }
      this.$page.setData({
        [this.path]: Object.assign(picker, model) // 补全属性
      })
    }
  }
})