import validate from '../mixins/validate.js'
import util from '/src/libs/util.js'

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

  // 挂载
  didMount() {
    this.init(this.props.model)
    this.validate(this.props.model.value)
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // value变化时校验
    if (prevProps.model.value !== this.props.model.value) {
      this.validate(this.props.model.value)
    }
  },

  methods: {
    // 清空
    clear() {
      if (this.props.model.disabled && !this.props.model.camera) {
        return
      }
      let value = `${this.path}.value`
      this.$page.setData({
        [value]: ''
      })
    },

    // 输入事件同步value
    handleInput: util.debounce(function(event) {
      let value = `${this.path}.value`
      this.$page.setData({
        [value]: event.detail.value
      })
    }, 500),

    // 点击事件
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

    // 扫码
    handleScan(event) {
      if (!this.props.model.camera) {
        return
      }
      dd.scan({
        type: this.props.model.scanType,
        success: (res) => {
          this.handleInput({ detail: { value: res.code } })
        }
      })
    },

    // 初始化属性
    init(model) {
      // 配置path
      this.path = model.path !== undefined ? model.path : ''
      if (model.sfi !== undefined) {
        this.path = `bizObj[${model.ci}].children[${model.sfi}][${model.sci}]`
      } else if (model.ci !== undefined) {
        this.path = `bizObj[${model.ci}]`
      }
      // scan对象
      let scan = {
        value: '',
        label: '',
        status: '',
        camera: true, // 可扫描
        focus: false,
        maxlength: 200,
        scanType: 'qr',
        disabled: false,
        necessary: false,
        notice: model.necessary ? '不能为空' : '',
        placeholder: model.necessary ? '必填' : ''
      }
      this.$page.setData({
        [this.path]: Object.assign(scan, model) // 补全属性
      })
    }
  }
})