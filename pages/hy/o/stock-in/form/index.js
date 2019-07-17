import formPage from '/src/render/formPage'
import http from '/src/http/index.js'
import util from '/src/libs/util.js'

formPage({
  // 提交地址
  url: '',

  // 权限标记，对应按钮的position
  // btnPos: 2,

  // // 表单背景
  // background: '',

  // // 导航栏配置，title默认为菜单名称
  // navigationBar: {
  //   title: '',
  //   backgroundColor: ''
  // },

  // 业务对象
  bizObj: [
    {
      label: '单据编号',
      key: 'doc_number',
      component: 'e-input',
      disabled: true
    },
    {
      label: '仓库',
      key: 'warehouse_name',
      component: 'e-input',
      disabled: true
    },
    {
      label: '入库日期',
      key: 'stockin_date',
      component: 'e-date-picker',
      disabled: true
    },
    {
      label: '供应商',
      key: 'supplier_name',
      component: 'e-input',
      disabled: true
    },
    {
      label: '状态',
      key: 'doc_status',
      component: 'e-input',
      disabled: true
    },
    {
      label: '备注',
      key: 'remark',
      component: 'e-text-area',
      maxlength: 500
    },
    {
      label: '明细',
      key: 'cons',
      component: 'e-subform',
      disabled: true,
      subform: [
        {
          label: '耗材分类',
          key: 'item_class_name',
          component: 'e-input',
          disabled: true
        },
        {
          label: '耗材编号',
          key: 'cons_code',
          component: 'e-input',
          disabled: true
        },
        {
          label: '耗材名称',
          key: 'cons_name',
          component: 'e-input',
          disabled: true
        },
        {
          label: '规格',
          key: 'cons_standard',
          component: 'e-input',
          disabled: true
        },
        {
          label: '单位',
          key: 'cons_unit',
          component: 'e-input',
          disabled: true
        },
        {
          label: '订单数量',
          key: 'order_qty',
          component: 'e-input',
          disabled: true
        },
        {
          label: '入库数量',
          key: 'stockin_qty',
          component: 'e-input',
          disabled: true
        }
      ]
    }
  ],

  // 初始化前
  beforeOnLoad(query, f) {
    return new Promise((resolve, reject) => {
      if (this.list && this.list.data) {
        // 获取明细
        http.get(null, { mock: 'consDetail' }).then(res => {
          this.list.data.cons = res.data.cons
          resolve()
        })
      } else {
        resolve()
      }
    })
  },

  // 保存前处理
  beforeSubmit(data) {
    let array = []
    for (let i = 0; i < data.cons.length; i++) {
      array.push(Object.assign(this.list.data.cons[i], data.cons[i]))
    }
    data.cons = array
    return Promise.resolve()
  },

  methods: {
    // 提交
    async handleApprove() {
      if (!this.handleValidate()) {
        return
      }
      let data = this.formatForm()
      let array = []
      for (let i = 0; i < data.cons.length; i++) {
        array.push(Object.assign(this.list.data.cons[i], data.cons[i]))
      }
      data.cons = array
      let options = {
        url: '',
        params: this.list.data ? Object.assign(this.list.data, data) : data
      }
      console.log(options)
      http.post(options).then(res => {
        if (res.status === 0) {
          util.ddToast({ type: 'success', text:  '审核成功' })
          app.emitter.emit(this.list.lid, {
            type: data.id ? 'edit' : 'add',
            index: this.list.index || undefined,
            data: res.data
          })
          dd.navigateBack({
            delta: 1
          })
        } else {
          util.ddToast({ type: 'fail', text:  '审核失败' })
        }
      })
    }
  }
})