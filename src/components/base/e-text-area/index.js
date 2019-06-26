import util from '/src/libs/util.js'
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

    // 补充params的属性
    init(model) {
      // 配置path
      this.path = model.path !== undefined ? model.path : ''
      if (model.sfi !== undefined) {
        this.path = `bizObj[${model.ci}].children[${model.sfi}][${model.sci}]`
      } else if (model.ci !== undefined) {
        this.path = `bizObj[${model.ci}]`
      }
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
        notice: model.necessary ? '不能为空' : '',
        placeholder: model.necessary ? '必填' : ''
      }
      this.$page.setData({
        [this.path]: Object.assign(textArea, model) // 补全属性
      })
    }
  }
})