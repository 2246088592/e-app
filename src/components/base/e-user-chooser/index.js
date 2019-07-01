import equal from '../mixins/equal.js'

let app = getApp()

Component({
  // 混合
  mixins: [equal],
  // 接收参数
  props: {
    model: {}
  },

  // 挂载方法
  didMount() {
    this.init(this.props.model)
    this.validate(this.props.model.value)
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // setData后校验
    if (!this.equal(prevProps.model.value, this.props.model.value)) {
      this.validate(this.props.model.value)
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
        limitTips: `最多选择${this.props.model.max}人`,
        maxUsers: this.props.model.max,
        // 已选
        pickedUsers: this.props.model.value.map(row => row.userId),
        // 不可选
        disabledUsers: this.props.model.disabledUsers,
        // 必选
        requiredUsers: this.props.model.requiredUsers,
        permissionType: "GLOBAL",
        responseUserOnly: true,
        startWithDepartmentId: 0,
        success: (res) => {
          let pickedUsers = `${this.path}.value`
          this.$page.$spliceData({
            [pickedUsers]: [0, this.props.model.value.length, ...res.users]
          })
        },
        fail: (err) => {
          console.error(err)
        }
      })
    },

    // 初始化属性
    init(model) {
      // 配置path
      this.path = model.path !== undefined ? model.path : ''
      if (model.sfi !== undefined) {
        this.path = `bizObj[${model.ci}].children[${model.sfi}][${model.sci}]`
      } else if (model.ci !== undefined) {
        this.path = `bizObj[${model.ci}]`
      }
      // userChooser对象
      let userChooser = {
        max: 100,
        value: [],
        label: '',
        status: '',
        multiple: true,
        disabled: false,
        necessary: false,
        type: 'complete', // 显示模式，默认完整模式，适合同时选择多人，占位较大，显示头像；精简模式（simple）只显示名字
        disabledUsers: [],
        requiredUsers: [],
        notice: model.necessary ? '不能为空' : ''
      }
      this.$page.setData({
        [this.path]: Object.assign(userChooser, model) // 补全属性
      })
    },

    // 校验方法
    validate(value) {
      let result = ''
      if (this.props.model.necessary) {
        if (!value || !value.length) {
          result = 'error'
        }
      }
      if (this.props.model.fid) {
        app.emitter.emit(`${this.props.model.fid}`, Object.assign({ ...this.props.model }, { status: result }))
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