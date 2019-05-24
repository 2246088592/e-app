import util from '/src/util.js'
let app = getApp()

Component({
  props: {
    params: {}
  },

  // 挂载方法
  didMount() {
    this._complete(this.props.params)
    this._validate()
  },

  // 更新
  didUpdate(prevProps, prevData) {
    if (!prevProps.params.value || !this.props.params.value) {
      return
    }
    // setData后校验
    if (prevProps.params.value.length !== this.props.params.value.length) {
      this._validate()
    }
  },

  methods: {
    // 删除已选人
    handleDelete(event) {
      let i = event.currentTarget.dataset.itemIndex
      let pickedUsers = `${this.props.params.id}.value`
      this.$page.$spliceData({
        [pickedUsers]: [i, 1]
      })
    },

    // 打开选人界面
    handleAdd() {
      if (this.props.params.disabled) {
        return
      }
      dd.complexChoose({
        title: `选择${this.props.params.label}`,
        multiple: this.props.params.multiple,
        limitTips: `超过限定人数${this.props.params.max}`,
        maxUsers: this.props.params.max,
        // 已选
        pickedUsers: this.props.params.value ? this.props.params.value.map(row => row.userId) : [],
        // 不可选
        disabledUsers: this.props.params.users.disabledUsers ? this.props.params.users.disabledUsers.map(row => row.userId) : [],
        // 必选
        requiredUsers: this.props.params.users.requiredUsers ? this.props.params.users.requiredUsers.map(row => row.userId) : [],
        permissionType: "GLOBAL",
        responseUserOnly: true,
        startWithDepartmentId: 0,
        success: (res) => {
          console.log(JSON.stringify(res.users))
          let pickedUsers = `${this.props.params.id}.value`
          this.$page.$spliceData({
            [pickedUsers]: [0, this.props.params.value.length, ...res.users]
          })
          app.emitter.emit(`${this.props.params.formId ? this.props.params.formId + '_' : ''}inputChange`, {
            detail: { inputId: this.props.params.id }
          })
        },
        fail: (err) => {
          util.ddToast('fail', '选择人员失败')
          console.error(err)
        }
      })
    },

    // 补充params的属性
    _complete(item) {
      if (!item.id) {
        console.error('此组件内props接收的参数没有设置id')
        return
      }
      let template = {
        max: 100,
        value: [],
        label: '',
        status: '',
        multiple: true,
        disabled: false,
        necessary: false,
        notice: item.necessary ? '至少选择一个人' : '',
        users: {
          disabledUsers: [],
          requiredUsers: []
        }
      }
      let obj = util.cloneDeep(item)
      for (let key in template) {
        if (!obj[key]) {
          obj[key] = template[key]
        }
      }
      let id = `${obj.id}`
      this.$page.setData({
        [id]: obj
      })
    },

    // 校验方法
    _validate() {
      let result = ''
      if (this.props.params.necessary && this.props.params.value && !this.props.params.value.length) {
        result = 'error'
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