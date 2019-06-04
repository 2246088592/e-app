import util from '/src/util.js'
let app = getApp()

Component({
  props: {
    model: {}
  },

  // 挂载方法
  didMount() {
    this.init(this.props.model)
    this.validate()
  },

  // 更新
  didUpdate(prevProps, prevData) {
    if (!prevProps.model.value || !this.props.model.value) {
      return
    }
    // setData后校验
    if (prevProps.model.value.length !== this.props.model.value.length) {
      this.validate()
    }
  },

  methods: {
    // 删除已选人
    handleDelete(event) {
      let i = event.currentTarget.dataset.itemIndex
      let pickedUsers = `${this.path}.value`
      this.$page.$spliceData({
        [pickedUsers]: [i, 1]
      })
    },

    // 打开选人界面
    handleAdd() {
      if (this.props.model.disabled) {
        return
      }
      dd.complexChoose({
        title: `选择${this.props.model.label}`,
        multiple: this.props.model.multiple,
        limitTips: `超过限定人数${this.props.model.max}`,
        maxUsers: this.props.model.max,
        // 已选
        pickedUsers: this.props.model.value.map(row => row.userId),
        // 不可选
        disabledUsers: this.props.model.users.disabledUsers,
        // 必选
        requiredUsers: this.props.model.users.requiredUsers,
        permissionType: "GLOBAL",
        responseUserOnly: true,
        startWithDepartmentId: 0,
        success: (res) => {
          let pickedUsers = `${this.path}.value`
          this.$page.$spliceData({
            [pickedUsers]: [0, this.props.model.value.length, ...res.users]
          })
          app.emitter.emit(`${this.props.model.formId}`, this.props.model)
        },
        fail: (err) => {
          util.ddToast('fail', '选择人员失败')
          console.error(err)
        }
      })
    },

    // 初始化属性
    init(model) {
      // 配置path
      this.path = model.sfi !== undefined ? `bizObj[${model.ci}].children[${model.sfi}][${model.sci}]` : `bizObj[${model.ci}]`
      // userChooser对象
      let userChooser = {
        max: 100,
        value: [],
        label: '',
        status: '',
        multiple: true,
        disabled: false,
        necessary: false,
        notice: model.necessary ? '至少选择一个人' : ''
      }
      // 补全属性
      model.users = Object.assign({
        disabledUsers: [],
        requiredUsers: []
      }, model.users)
      this.$page.setData({
        [this.path]: Object.assign(userChooser, model)
      })
    },

    // 校验方法
    validate() {
      let result = ''
      if (this.props.model.necessary && this.props.model.value && !this.props.model.value.length) {
        result = 'error'
      }
      if (this.props.model.status === result) {
        return
      }
      let status = `${this.path}.status`
      this.$page.setData({
        [status]: result
      })
    }
  }
})