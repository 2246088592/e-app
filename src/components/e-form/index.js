import util from '/src/util.js'

Component({
  data: {
    btns: [
      {
        action_name: "提交",
        handler: "handleSubmit",
        icon_cls: "save",
        position: 1,
        xtype: "primary"
      }
    ]
  },
  props: {
    bizObj: [],
    btnPos: '',
    onRules: () => {
      return []
    }
  },
  didMount() {
    this.initRules()
  },
  methods: {
    // 表单底部按钮事件
    handleBtn(event) {
      let btn = event.currentTarget.dataset.btn
      this.$page[btn.handler](btn)
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
      let c = event.currentTarget.dataset.c
      let sfi = event.currentTarget.dataset.sfi
      dd.confirm({
        title: '温馨提示',
        content: `确认删除${c.label}${sfi + 1}吗?`,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: (res) => {
          if (res.confirm) {
            let children = `bizObj[${c.ci}].children`
            this.$page.$spliceData({
              [children]: [sfi, 1]
            })
          }
        }
      })
    }
  }
})