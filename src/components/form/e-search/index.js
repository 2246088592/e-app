let app = getApp()

Component({
  props: {
    params: {},
    onValidate: (val) => {
      return true
    }
  },

  // 挂载
  didMount() {
    this._complete(this.props.params)
    this._validate(this.props.params.value)
    app.emitter.on(`${this.props.params.id}_selectChange`, this.selectChange, this)
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // setData后校验
    if (prevProps.params.value !== this.props.params.value) {
      this._validate(this.props.params.value)
    }
  },

  // 事件销毁
  didUnmount() {
    app.emitter.removeListener(`${this.props.params.id}_selectChange`, this.selectChange, this)
  },

  methods: {
    // 从列表返回的事件
    selectChange(event) {
      if (event.detail.eSearchId ? event.detail.eSearchId === this.props.params.id : false) {
        this.handleSelect(event.detail.data)
      }
    },

    // 点击选项事件
    handleSelect(result) {
      let value = `${this.props.params.id}.value`
      this.$page.setData({
        [value]: result
      })
      app.emitter.emit(`${this.props.params.formId ? this.props.params.formId + '_' : ''}inputChange`, {
        detail: {
          inputId: this.props.params.id,
          objId: this.props.params.objId || null,
          sublist: this.props.params.sublist || null,
          subindex: this.props.params.subindex === 0 ? 0 : null
        }
      })
    },

    // 跳转到搜索页面
    handleTap(event) {
      if (this.props.params.disabled) {
        return
      }
      let params = JSON.stringify(this.props.params)
      dd.navigateTo({
        // 固定路径
        url: `/pages/${this.props.params.searchOptions.bindList}/list/index?params=${params}`
      })
    },

    // 补充params的属性
    _complete(item) {
      if (!item.id) {
        console.error('此组件内props接收的参数没有设置id')
        return
      }
      if (item.sublist) {
        item.objId = item.id
        item.id = `${item.sublist}.array[${item.subindex}].${item.id}`
      }
      let obj = {
        auth: {},
        value: '',
        label: '',
        status: '',
        disabled: false,
        necessary: false,
        placeholder: item.necessary ? '必填' : '',
        notice: item.necessary ? '不能为空' : ''
      }
      let temp = item
      for (let key in obj) {
        if (!temp[key]) {
          temp[key] = obj[key]
        }
      }
      temp.searchOptions = Object.assign({
        bindList: '',
        params: {}
      }, item.searchOptions)
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