import util from '/src/util.js'

Component({
  props: {
    params: {},
    onValidate: (val, maxlength) => {
      if (!maxlength || maxlength === -1) {
        return true
      }
      return maxlength >= val.length
    }
  },

  // 挂载
  didMount() {
    this._complete(this.props.params)
    this._validate(this.props.params.value)
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // setData后进行value校验
    if (prevProps.params.value !== this.props.params.value) {
      this._validate(this.props.params.value)
    }
  },

  methods: {
    // 定位方法
    _position() {
      let placeholder = `${this.props.params.id}.placeholder`
      this.$page.setData({
        [placeholder]: '自动定位中...'
      })
      dd.getLocation({
        type: 2,
        success: (res) => {
          let location = `${this.props.params.id}.location`
          let value = `${this.props.params.id}.value`
          this.$page.setData({
            [placeholder]: this.props.params.necessary ? '请输入或选择地址' : '',
            [location]: res,
            [value]: res.address
          })
        },
        fail: (err) => {
          util.ddToast('fail', '自动定位失败,请手动输入或选择...')
          console.error(err)
        }
      })
    },

    // 唤起地图
    oepnMap(event) { },

    // 输入事件
    handleInput(event) {
      let value = `${this.props.params.id}.value`
      this.$page.setData({
        [value]: event.detail.value
      })
    },

    // 设置焦点
    handleTap() {
      let focus = `${this.props.params.id}.focus`
      this.$page.setData({
        [focus]: true
      })
    },

    // 手机键盘确认事件
    handleConfirm(event) { },

    // 获取焦点
    handleFocus(event) { },

    // 失去焦点
    handleBlur(event) {
      let focus = `${this.props.params.id}.focus`
      this.$page.setData({
        [focus]: false
      })
    },

    // 补充params的属性
    _complete(item) {
      if (!item.id) {
        console.error('此组件内props接收的参数没有设置id')
        return
      }
      let obj = {
        value: '',
        label: '',
        status: '',
        focus: false,
        location: {},
        maxlength: -1,
        disabled: false,
        placeholder: '',
        necessary: false,
        notice: item.necessary ? '不能为空' : ''
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
      this._position()
    },

    // 校验方法
    _validate(val) {
      let result = ''
      if (this.props.params.necessary) {
        if (!val) {
          result = 'error'
        } else {
          result = this.props.onValidate(val, this.props.params.maxlength) ? 'success' : 'error'
        }
      } else {
        if (!val) {
          result = ''
        } else {
          result = this.props.onValidate(val, this.props.params.maxlength) ? 'success' : 'error'
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