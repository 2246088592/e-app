import formPage from '/src/render/formPage'

formPage({
  id: 'purchaseForm',
  navbarOptions: {
    title: '采购'
  },
  formParams: {
    ask_dept: {
      id: 'ask_dept',
      formId: 'purchaseForm',
      label: '使用部门',
      // necessary: true
    },
    ask_person: {
      id: 'ask_person',
      formId: 'purchaseForm',
      label: '申购人',
      // necessary: true
    },
    ask_date: {
      id: 'ask_date',
      formId: 'purchaseForm',
      label: '申购日期',
      default: true,
      format: 'yyyy-MM-dd',
      // necessary: true
    },
    goods: {
      id: 'goods',
      label: '物品明细',
      template: {
        ask_type: {
          id: 'ask_type',
          formId: 'purchaseForm',
          label: '申购类型',
          // necessary: true,
          cascaderOptions: {
            bindKey: 'name',
            tree: [
              {
                name: '医用耗材',
                children: [
                  { name: '针头' },
                  { name: '针筒' },
                  { name: '导尿管' },
                  { name: '留置针' },
                  { name: '手套/指套' },
                  { name: '绷带' }
                ]
              },
              {
                name: '办公用品',
                children: [
                  { name: '纸' },
                  { name: '资料册' },
                  { name: '笔' },
                  { name: '夹子' }
                ]
              }
            ]
          }
        },
        good_name: {
          id: 'good_name',
          formId: 'purchaseForm',
          label: '物品名称',
          // necessary: true,
          searchOptions: {
            bindKey: 'name',
            bindList: 'good'
          }
        },
        good_spec: {
          id: 'good_spec',
          formId: 'purchaseForm',
          label: '建议规格',
          disabled: true
        },
        ask_num: {
          id: 'ask_num',
          formId: 'purchaseForm',
          label: '申购数量',
          // necessary: true
        }
      },
      array: [
        {
          ask_type: {
            id: 'ask_type',
            formId: 'purchaseForm',
            label: '申购类型',
            // necessary: true,
            cascaderOptions: {
              bindKey: 'name',
              tree: [
                {
                  name: '医用耗材',
                  children: [
                    { name: '针头' },
                    { name: '针筒' },
                    { name: '导尿管' },
                    { name: '留置针' },
                    { name: '手套/指套' },
                    { name: '绷带' }
                  ]
                },
                {
                  name: '办公用品',
                  children: [
                    { name: '纸' },
                    { name: '资料册' },
                    { name: '笔' },
                    { name: '夹子' }
                  ]
                }
              ]
            }
          },
          good_name: {
            id: 'good_name',
            formId: 'purchaseForm',
            label: '物品名称',
            // necessary: true,
            searchOptions: {
              bindKey: 'name',
              bindList: 'good'
            }
          },
          good_spec: {
            id: 'good_spec',
            formId: 'purchaseForm',
            label: '建议规格',
            disabled: true
          },
          ask_num: {
            id: 'ask_num',
            formId: 'purchaseForm',
            label: '申购数量',
            // necessary: true
          }
        }
      ]
    },
    ask_reason: {
      id: 'ask_reason',
      formId: 'purchaseForm',
      label: '申购理由',
      maxlength: 500
    }
  },
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
  },
  onReady(){
    console.log(this)
  },
  functions: {
    beforeFormSubmit(obj, saveForm) {
      console.log(obj, saveForm)
    }
  }
})