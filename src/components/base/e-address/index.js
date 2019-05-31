import util from '/src/util.js'

Component({
  props: {
    model: {},
    // 默认校验方法
    onValidate: (value, maxlength) => {
      if (!maxlength || maxlength === -1) {
        return true
      }
      return maxlength >= value.length
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
    // 唤起地图
    oepnMap(event) { },

    // 定位方法
    position() {
      let placeholder = `${this.props.model.path}.placeholder`
      this.$page.setData({
        [placeholder]: '自动定位中...'
      })
      dd.getLocation({
        type: 2,
        success: (res) => {
          let location = `${this.props.model.path}.location`
          let value = `${this.props.model.path}.value`
          this.$page.setData({
            [placeholder]: this.props.model.necessary ? '请输入或选择地址' : '',
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

    // 输入事件同步value
    handleInput: util.debounce(function(event) {
      let value = `${this.props.model.path}.value`
      this.$page.setData({
        [value]: event.detail.value
      })
    }, 500),

    // 设置焦点
    handleTap() {
      let focus = `${this.props.model.path}.focus`
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
      let focus = `${this.props.model.path}.focus`
      this.$page.setData({
        [focus]: false
      })
    },

    // 初始化model的属性
    init(model) {
      // address对象
      let address = {
        path: `bizObj[${model.formIndex}]`,
        value: '',
        label: '',
        status: '',
        focus: false,
        location: {},
        maxlength: -1,
        disabled: false,
        necessary: false,
        placeholder: model.necessary ? '必填' : '',
        notice: model.maxlength > -1 ? `长度不能超过${model.maxlength}` : ''
      }
      let path = `${address.path}`
      // 补全属性
      this.$page.setData({
        [path]: Object.assign(address, model)
      })
      // 定位
      this.position()
    },

    // 校验方法
    validate(value) {
      let result = ''
      if (this.props.model.necessary) {
        if (!value) {
          result = 'error'
        } else {
          result = this.props.onValidate(value, this.props.model.maxlength) ? 'success' : 'error'
        }
      } else {
        if (!value) {
          result = ''
        } else {
          result = this.props.onValidate(value, this.props.model.maxlength) ? 'success' : 'error'
        }
      }
      if (this.props.model.status === result) {
        return
      }
      let status = `${this.props.model.path}.status`
      this.$page.setData({
        [status]: result
      })
    }
  }
})