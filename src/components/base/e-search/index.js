import validate from '../mixins/validate.js'
import equal from '../mixins/equal.js'
import clear from '../mixins/clear.js'

let app = getApp()

Component({
  // 混合校验
  mixins: [validate, equal, clear],
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
    app.emitter.on(`C${this.$page.$viewId + this.$id}`, this.handleSelect, this)
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // setData后校验
    if (!this.equal(prevProps.model.value, this.props.model.value)) {
      this.validate(this.props.model.value)
    }
  },

  // 事件销毁
  didUnmount() {
    app.emitter.removeListener(`C${this.$page.$viewId + this.$id}`, this.handleSelect, this)
  },

  methods: {
    // 点击选项事件
    handleSelect(event) {
      let value = `${this.path}.value`
      this.$page.setData({
        [value]: event
      })
    },

    // 跳转到搜索页面
    handleTap(event) {
      if (this.props.model.disabled) {
        return
      }
      let esearch = JSON.stringify({ cid: `C${this.$page.$viewId + this.$id}`, params: this.props.model.params })
      dd.navigateTo({
        url: `${this.props.model.bindlist}?esearch=${esearch}`
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
      // search对象
      let search = {
        value: '',
        label: '',
        params: {}, // 过滤条件
        status: '',
        bindkey: '', // 要显示的key
        bindlist: '', // 目标列表，路径
        disabled: false,
        necessary: false,
        notice: model.necessary ? '不能为空' : '',
        placeholder: model.necessary ? '必填' : ''
      }
      this.$page.setData({
        [this.path]: Object.assign(search, model) // 补全属性
      })
    }
  }
})