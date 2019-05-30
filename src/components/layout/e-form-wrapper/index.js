import util from '/src/util.js'

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
    // 表单提交
    handleSubmit() {
      console.log(this.props.bizObj)
    },

    // 初始化校验函数
    initRules() {
      let rules = this.props.onRules()
      rules.forEach(c => this[`on_${c.fid}_${c.key}`] = c.validate)
    },

    // 新增行
    handleAdd(event) {
      let ci = event.currentTarget.dataset.ci
      let children = `bizObj[${ci}].children`
      let subform = util.cloneDeep(this.props.bizObj[ci].subform)
      subform = subform.map(sc => {
        return { ...sc, sfi: this.props.bizObj[ci].children.length }
      })
      this.$page.$spliceData({
        [children]: [this.props.bizObj[ci].children.length, 0, subform]
      })
    },

    // 删除行
    handleDelete(event) {
      let ci = event.currentTarget.dataset.ci
      let sfi = event.currentTarget.dataset.sfi
      let children = `bizObj[${ci}].children`
      this.$page.$spliceData({
        [children]: [sfi, 1]
      })
    }
  }
})