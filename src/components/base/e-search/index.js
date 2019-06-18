import validate from '../mixins/validate.js'

let app = getApp()

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
    app.emitter.on(`C${this.$page.$viewId + this.$id}`, this.handleSelect, this)
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // setData后校验
    if (!equal(prevProps.model.value, this.props.model.value)) {
      this.validate(this.props.model.value)
    }
  },

  // 事件销毁
  didUnmount() {
    app.emitter.removeListener(`C${this.$page.$viewId + this.$id}`, this.handleSelect, this)
  },

  methods: {
    // 点击选项事件
    handleSelect(result) {
      let value = `${this.path}.value`
      this.$page.setData({
        [value]: result
      })
      // app.emitter.emit(`${this.props.params.formId ? this.props.params.formId + '_' : ''}inputChange`, {
      //   detail: {
      //     inputId: this.props.params.id,
      //     objId: this.props.params.objId || null,
      //     sublist: this.props.params.sublist || null,
      //     subindex: this.props.params.subindex === 0 ? 0 : null
      //   }
      // })
    },

    // 跳转到搜索页面
    handleTap(event) {
      if (this.props.model.disabled) {
        return
      }
      let params = JSON.stringify({ ...this.props.model, cid: `C${this.$page.$viewId + this.$id}` })
      dd.navigateTo({
        // 固定路径
        url: `/pages/${this.props.model.options.bindList}/list/index?params=${params}`
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
        status: '',
        disabled: false,
        necessary: false,
        placeholder: model.necessary ? '必填' : '',
        notice: model.necessary ? '不能为空' : ''
      }
      // 补全属性
      model.options = Object.assign({
        bindList: '',
        params: {},
        bindKey: '',
      }, model.options)
      this.$page.setData({
        [this.path]: Object.assign(search, model)
      })
    }
  }
})