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
    // 删除已选部门
    handleDelete(event) {
      let i = event.currentTarget.dataset.itemIndex
      let pickedDepts = `${this.props.params.id}.value`
      this.$page.$spliceData({
        [pickedDepts]: [i, 1]
      })
    },

    // 打开部门界面
    handleAdd() {
      if (this.props.params.disabled) {
        return
      }
      dd.chooseDepartments({
        title: `选择${this.props.params.label}`,
        multiple: this.props.params.multiple,
        limitTips: `超过限定部门数${this.props.params.max}`,
        maxDepartments: this.props.params.max,
        //已选部门
        pickedDepartments: this.props.params.value ? this.props.params.value.map(row => row.id) : [],
        //不可选部门
        disabledDepartments: this.props.params.depts.disabledDepts ? this.props.params.depts.disabledDepts.map(row => row.id) : [],
        //必选部门（不可取消选中状态）
        requiredDepartments: this.props.params.depts.requiredDepts ? this.props.params.depts.requiredDepts.map(row => row.id) : [],
        permissionType: "GLOBAL",
        success: (res) => {
          let pickedDepts = `${this.props.params.id}.value`
          this.$page.$spliceData({
            [pickedDepts]: [0, this.props.params.value.length, ...res.departments]
          })
          app.emitter.emit(`${this.props.params.formId ? this.props.params.formId + '_' : ''}inputChange`, {
            detail: { inputId: this.props.params.id }
          })
        },
        fail: (err) => {
          util.ddToast('fail', '选择部门失败')
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
        notice: item.necessary ? '至少选择一个部门' : '',
        depts: {
          disabledDepts: [],
          requiredDepts: []
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