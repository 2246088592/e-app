let app = getApp()

Component({
  props: {
    params: {}
  },

  // 挂载方法
  didMount() {
    this._complete(this.props.params)
  },

  methods: {
    // 切换事件
    switchChange(event) {
      let checked = `${this.props.params.id}.checked`
      let value = `${this.props.params.id}.value`
      this.$page.setData({
        [checked]: event.detail.value,
        [value]: event.detail.value ? this.props.params.values[1] : this.props.params.values[0]
      })
      app.emitter.emit(`${this.props.params.formId ? this.props.params.formId + '_' : ''}inputChange`, {
        detail: { inputId: this.props.params.id }
      })
    },

    // 补充params的属性
    _complete(item) {
      if (!item.id) {
        console.error('此组件内props接收的参数没有设置id')
        return
      }
      let obj = {
        label: '',
        value: item.checked ? item.values[1] || true : item.values[0] || false,
        values: [false, true],
        labels: [false, true],
        disabled: false,
        checked: false,
        color: '#108ee9',
      }
      let temp = item
      for (let key in obj) {
        if (!temp[key]) {
          temp[key] = obj[key]
        }
      }
      let id = `${temp.id}`
      this.$page.setData({
        [id]: temp
      })
    }

  }

})