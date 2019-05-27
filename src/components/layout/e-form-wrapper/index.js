Component({
  props: {
    bizObj: [],
    onRules: () => {
      return []
    }
  },
  didMount() {
    this.initRules()
  },
  methods: {
    // 初始化校验函数
    initRules() {
      let rules = this.props.onRules()
      rules.forEach(o => this[`on_${o.formId}_${o.key}`] = o.validate)
    },
    // 表单提交
    handleSubmit(e) {
      console.log(e.detail.value)
    },
    // 表单重置
    handleReset(e) {
      console.log('form发生了reset事件')
    }
  }
})