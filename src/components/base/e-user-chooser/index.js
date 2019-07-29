import mount from '../mixins/mount.js'
import validate from '../mixins/validate.js'

Component({
  mixins: [mount, validate],

  props: {
    model: {},
    // 默认校验方法
    onValidate: () => true
  },

  methods: {
    // 删除已选人
    handleDelete(event) {
      if (this.props.model.disabled) {
        return
      }
      let i = event.target.dataset.i
      let pickedUsers = `${this.path}.value`
      this.$page.$spliceData({
        [pickedUsers]: [i, 1]
      })
    },

    // 打开选人界面
    handleAdd(event) {
      if (this.props.model.disabled) {
        return
      }
      dd.complexChoose({
        title: `选择${this.props.model.label}`,
        multiple: this.props.model.multiple,
        limitTips: `最多选择${this.props.model.max}个人`,
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
      let value = []
      if (model.default && !model.value && getApp().globalData.userInfo) {
        let userInfo = getApp().globalData.userInfo
        value.push({
          userId: userInfo.dd_user_info.Id,
          name: userInfo.dd_user_info.Name,
          avatar: userInfo.dd_user_info.Avatar
        })
      }
      // userChooser对象
      let userChooser = {
        max: 100,
        value: value,
        label: '',
        default: false,
        multiple: true,
        disabled: false,
        necessary: false,
        type: 'complete', // 显示模式，默认完整模式，适合同时选择多人，占位较大，显示头像；精简模式（simple）只显示名字
        disabledUsers: [],
        requiredUsers: [],
        placeholder: model.necessary ? '必填' : ''
      }
      // 补全属性
      this.$page.setData({
        [this.path]: Object.assign(userChooser, model, this.initValidate(model))
      })
    },

    // 无效事件
    void() { }
  }
})