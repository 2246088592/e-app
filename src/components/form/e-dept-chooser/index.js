import util from '/src/util.js'
let app = getApp()

Component({
  props: {
    params: {},
    // 默认校验方法
    onValidate: (value) => {
      return true
    }
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
    // 删除已选部门
    handleDelete(event) {
      let i = event.currentTarget.dataset.itemIndex
      let pickedDepts = `${this.props.model.path}.value`
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
        limitTips: `超过限定部门数${this.props.model.max}`,
        maxDepartments: this.props.model.max,
        //已选部门
        pickedDepartments: this.props.model.value.map(row => row.id),
        //不可选部门
        disabledDepartments: this.props.model.depts.disabledDepts,
        //必选部门（不可取消选中状态）
        requiredDepartments: this.props.model.depts.requiredDepts,
        permissionType: "GLOBAL",
        success: (res) => {
          let pickedDepts = `${this.props.model.path}.value`
          this.$page.$spliceData({
            [pickedDepts]: [0, this.props.model.value.length, ...res.departments]
          })
          app.emitter.emit(`${this.props.model.formId}`, this.props.model.key)
        },
        fail: (err) => {
          util.ddToast('fail', '选择部门失败')
          console.error(err)
        }
      })
    },

    // 初始化model的属性
    init(model) {
      // dept-chooser对象
      let deptChooser = {
        path: `bizObj[${model.formIndex}]`,
        max: 100,
        value: [],
        label: '',
        status: '',
        multiple: true,
        disabled: false,
        necessary: false,
        notice: model.necessary ? '至少选择一个部门' : '',
        placeholder: model.necessary ? '必填' : ''
      }
      let path = `${deptChooser.path}`
      // 补全属性
      model.depts = Object.assign({
        disabledDepts: [],
        requiredDepts: []
      }, model.depts)
      this.$page.setData({
        [path]: Object.assign(deptChooser, model)
      })
    },

    // 校验方法
    validate(value) {
      let result = ''
      if (this.props.model.necessary) {
        if (!value || !this.props.model.value.length) {
          result = 'error'
        } else {
          result = this.props.onValidate(value) ? 'success' : 'error'
        }
      } else {
        if (!value) {
          result = ''
        } else {
          result = this.props.onValidate(value) ? 'success' : 'error'
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