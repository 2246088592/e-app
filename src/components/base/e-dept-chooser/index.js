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
    // 删除已选部门
    handleDelete(event) {
      let i = event.currentTarget.dataset.itemIndex
      let pickedDepts = `${this.path}.value`
      this.$page.$spliceData({
        [pickedDepts]: [i, 1]
      })
    },

    // 打开部门界面
    handleAdd() {
      if (this.props.model.disabled) {
        return
      }
      dd.chooseDepartments({
        title: `选择${this.props.model.label}`,
        multiple: this.props.model.multiple,
        limitTips: `最多选择${this.props.model.max}个部门`,
        maxDepartments: this.props.model.max,
        //已选部门
        pickedDepartments: this.props.model.value.map(row => row.id),
        //不可选部门
        disabledDepartments: this.props.model.disabledDepts,
        //必选部门（不可取消选中状态）
        requiredDepartments: this.props.model.requiredDepts,
        permissionType: "GLOBAL",
        success: (res) => {
          let pickedDepts = `${this.path}.value`
          this.$page.$spliceData({
            [pickedDepts]: [0, this.props.model.value.length, ...res.departments]
          })
        },
        fail: (err) => {
          console.error(err)
        }
      })
    },

    // 初始化model的属性
    init(model) {
      // dept-chooser对象
      let deptChooser = {
        max: 100,
        value: [],
        label: '',
        multiple: true,
        disabled: false,
        necessary: false,
        disabledDepts: [],
        requiredDepts: [],
        placeholder: model.necessary ? '必填' : ''
      }
      // 补全属性
      this.$page.setData({
        [this.path]: Object.assign(deptChooser, model, this.initValidate(model))
      })
    },

    // 无效事件
    void() { }
  }
})