import formPage from '/src/render/formPage'

formPage({
  // 导航栏
  navigationBar: {
    title: '表单组件测试'
  },
  // 业务对象
  bizObj: [
    {
      label: '使用部门',
      key: 'ask_dept',
      necessary: true
    }
  ],
  inputChange(event) {
    let value
    let id
    if (event.detail.objId) {
      let item = this.data[event.detail.sublist].array[event.detail.subindex]
      value = item[event.detail.objId]
      id = event.detail.objId
    } else {
      value = this.data[event.detail.inputId]
      id = event.detail.inputId
    }
    switch (id) {
      case 'good_name':
        let _value = `${event.detail.sublist}.array[${event.detail.subindex}].good_spec.value`
        this.setData({
          [_value]: value.value.spec,
        })
        break
      default:
        break
    }
  }
})