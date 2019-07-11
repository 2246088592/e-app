import util from '/src/libs/util.js'
import validate from '../mixins/validate.js'

Component({
  // 混合校验
  mixins: [validate],
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
    // value变化时校验
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
      let focus = `${this.path}.focus`
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
      let focus = `${this.path}.focus`
      this.$page.setData({
        [focus]: false
      })
    },

    // 清空输入并获取焦点
    handleClear(event) {
      let value = `${this.path}.value`
      let focus = `${this.path}.focus`
      this.$page.setData({
        [value]: '',
        [focus]: true
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
      // input对象
      let input = {
        value: '',
        label: '',
        status: '',
        focus: false,
        maxlength: 200,
        disabled: false,
        necessary: false,
        placeholder: model.necessary ? '必填' : '',
        notice: model.necessary ? '不能为空' : ''
      }
      // 补全属性
      this.$page.setData({
        [this.path]: Object.assign(input, model)
      })
    }
  }
})