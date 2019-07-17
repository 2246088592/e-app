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
      label: '领用日期',
      key: 'stockout_date',
      component: 'e-date-picker',
      disabled: true,
      format: 'yyyy-MM-dd'
    },
    {
      label: '领用人',
      key: 'stockout_person',
      component: 'e-user-chooser',
      necessary: true
    },
    {
      label: '领用部门',
      key: 'stockout_dept',
      component: 'e-dept-chooser',
      necessary: true
    },
    {
      label: '备注',
      key: 'remark',
      component: 'e-text-area',
      maxlength: 200
    },
    {
      label: '耗材',
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
          label: '申请数量',
          key: 'apply_qty',
          component: 'e-input',
          disabled: true
        },
        {
          label: '领用数量',
          key: 'stockout_qty',
          component: 'e-input',
          necessary: true,
          number: true
        }
      ]
    }
  ],

  // 初始化前
  beforeOnLoad(query, f) {
    return new Promise((resolve, reject) => {
      if (this.list && this.list.data) {
        // 配置领用人
        this.list.data.stockout_person = [{
          userId: this.list.data.stockout_person_id,
          name: this.list.data.stockout_person,
          avatar: this.list.data.stockout_person_avatar
        }]
        // 配置领用部门
        this.list.data.stockout_dept = [{
          id: this.list.data.stockout_dept_id,
          name: this.list.data.stockout_dept
        }]
        // 获取耗材明细
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
    data.stockout_dept = data.stockout_dept[0].id
    data.stockout_person = data.stockout_person[0].userId
    let array = []
    for (let i = 0; i < data.cons.length; i++) {
      array.push(Object.assign(this.list.data.cons[i], data.cons[i]))
    }
    data.cons = array
    return Promise.resolve()
  },

  methods: {
    // 提交
    async handleSubmit() {
      if (!this.handleValidate()) {
        return
      }
      let data = this.formatForm()
      data.stockout_dept = data.stockout_dept[0].id
      data.stockout_person = data.stockout_person[0].userId
      let array = []
      for (let i = 0; i < data.cons.length; i++) {
        array.push(Object.assign(this.list.data.cons[i], data.cons[i]))
      }
      data.cons = array
      let options = {
        url: '',
        params: this.list.data ? Object.assign(this.list.data, data) : data
      }
      http.post(options).then(res => {
        if (res.status === 0) {
          util.ddToast({ type: 'success', text:  '提交成功' })
          app.emitter.emit(this.list.lid, {
            type: data.id ? 'edit' : 'add',
            index: this.list.index || undefined,
            data: res.data
          })
          dd.navigateBack({
            delta: 1
          })
        } else {
          util.ddToast({ type: 'fail', text: res.message || '提交失败' })
        }
      })
    }
  }
})