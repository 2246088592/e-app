Component({
  props: {
    params: {},
    onValidate: (val) => {
      return true
    }
  },

  // 挂载方法
  didMount() {
    this._complete(this.props.params)
    this._validate(this.props.params.value)
  },

  // setData后进行value校验
  didUpdate(prevProps, prevData) {
    if (prevProps.params.value !== this.props.params.value) {
      this._validate(this.props.params.value)
    }
  },

  methods: {
    // 设置value
    handleChange(event) {
      let value = `${this.props.params.id}.value`
      this.$page.setData({
        [value]: event.detail.value
      })
    },

    // 补充params的属性
    _complete(item) {
      if (!item.id) {
        console.error('此组件内props接收的参数没有设置id')
        return
      }
      let obj = {
        step: 1,
        value: 0,
        label: '',
        status: '',
        notice: '',
        disabled: false,
        necessary: false
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
    },

    // 校验方法
    _validate(val) {
      let result = ''
      if (this.props.params.necessary) {
        if (!val) {
          result = 'error'
        } else {
          result = this.props.onValidate(val) ? 'success' : 'error'
        }
      } else {
        if (!val) {
          result = ''
        } else {
          result = this.props.onValidate(val) ? 'success' : 'error'
        }
      }
      if (this.props.params.status === result) {
        return
      }
      let status = `${this.props.params.id}.status`
      this.$page.setData({
        [status]: result
      })
    }

  }

})