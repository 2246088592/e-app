import util from '/src/libs/util.js'
import validate from '../mixins/validate.js'
import clear from '../mixins/clear.js'

Component({
  // 混合校验
  mixins: [validate, clear],
  // 接收参数
  props: {
    model: {},
    // 默认校验方法
    onValidate: (value) => {
      return true
    }
  },
  // 挂载
  didMount() {
    this.init(this.props.model)
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
      this.path = model.path !== undefined ? model.path : ''
      if (model.sfi !== undefined) {
        this.path = `bizObj[${model.ci}].children[${model.sfi}][${model.sci}]`
      } else if (model.ci !== undefined) {
        this.path = `bizObj[${model.ci}]`
      }
      // datePicker对象
      let datePicker = {
        value: model.default && !model.value ? util.formatDate(model.format || 'yyyy-MM-dd', new Date()) : '',
        label: '',
        status: '',
        disabled: false,
        necessary: false,
        icon: 'calendar',
        format: 'yyyy-MM-dd',
        default: model.default ? model.default : false,
        placeholder: model.necessary ? '必填' : '',
        notice: model.necessary ? '不能为空' : ''
      }
      // 补全属性
      this.$page.setData({
        [this.path]: Object.assign(datePicker, model)
      })
    }
  }
})