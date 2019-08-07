import formPage from '/src/render/formPage'
import http from '/src/http/index.js'
import util from '/src/libs/util.js'

formPage({
  // 提交地址
  url: '/business/por',

  // 是否带有明细
  detail: true,

  // 权限按钮位置
  btnPos: 2,

  // 业务对象
  bizObj: [
    {
      label: '单据编号',
      key: 'doc_number',
      component: 'e-input',
      disabled: true,
      placeholder: '系统自动生成'
    },
    {
      label: '申请日期',
      key: 'apply_date',
      component: 'e-date-picker',
      default: true,
      disabled: true,
      format: 'yyyy-MM-dd'
    },
    {
      label: '申请人',
      key: 'apply_person',
      component: 'e-user-chooser',
      default: true,
      disabled: true
    },
    {
      label: '申请部门',
      key: 'apply_dept',
      component: 'e-dept-chooser',
      // necessary: true,
      max: 1
    },
    {
      label: '单据状态',
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
      label: '耗材',
      key: 'children',
      component: 'e-subform',
      subform: [
        {
          label: '耗材名称',
          key: 'cons_name',
          component: 'e-search',
          bindlist: '/pages/hy/base/cons/list/index',
          bindkey: 'cons_name',
          necessary: true
        },
        {
          label: '耗材编号',
          key: 'cons_code',
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
          number: true,
          necessary: true
        }
      ]
    }
  ],

  // 初始化前
  beforeOnLoad(query) {
    return new Promise((resolve, reject) => {
      if (this.list && this.list.data) {
        // 获取耗材明细
        http.get({ url: '/business/por-detail' }).then(res => {
          if (res.status === 0) {
            this.list.data.children = res.data.map(item => {
              item.cons_name = { cons_name: item.cons_name }
              return item
            })
            resolve()
          } else {
            util.ddToast({ type: 'success', text: '提交成功' })
            resolve()
          }
        }).catch(err => {
          resolve()
        })
      } else {
        resolve()
      }
    })
  },

  // 表单变化监听
  formChange(event) {
    if (event.key === 'cons_name') {
      let cons_code = `bizObj[${event.ci}].children[${event.sfi}][1].value`
      let cons_standard = `bizObj[${event.ci}].children[${event.sfi}][2].value`
      let cons_unit = `bizObj[${event.ci}].children[${event.sfi}][3].value`
      this.setData({
        [cons_code]: event.value.cons_code || '',
        [cons_standard]: event.value.cons_standard || '',
        [cons_unit]: event.value.cons_unit || ''
      })
    }
  },

  // 保存前处理
  beforeSubmit(data) {
    data.children = data.children.map(item => {
      item.cons_name = item.cons_name.cons_name
      return item
    })
    return Promise.resolve()
  },

  methods: {
    // 提交
    handleSubmit() {
      this.saveForm()
    },

    // 查看审批流
    handleProcess() {
      console.log(getApp())
    }
  }
})