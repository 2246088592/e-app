import formPage from '/src/render/formPage'
import http from '/src/http/index.js'
import util from '/src/libs/util.js'

formPage({
  // 提交地址
  url: '/business/por',

  // 是否带有明细
  detail: true,

  // 权限按钮位置
  btnPos: 20,

  // 业务对象
  bizObj: [
    {
      label: '请购单号',
      key: 'doc_number',
      component: 'e-input',
      disabled: true,
      placeholder: '系统自动生成'
    },
    {
      label: '请购日期',
      key: 'apply_date',
      component: 'e-date-picker',
      default: true,
      disabled: true,
      format: 'yyyy-MM-dd'
    },
    {
      label: '请购人',
      key: 'apply_person',
      component: 'e-user-chooser',
      default: true,
      disabled: true
    },
    {
      label: '请购部门',
      key: 'apply_dept',
      component: 'e-dept-chooser',
      necessary: true,
      max: 1
    },
    {
      label: '状态',
      key: 'doc_status_text',
      component: 'e-input',
      disabled: true
    },
    {
      label: '备注',
      key: 'remark',
      component: 'e-text-area',
      maxlength: 200
    },
    {
      label: '耗材',
      key: 'children',
      component: 'e-subform',
      subform: [
        {
          label: '耗材名称',
          key: 'cons_id',
          component: 'e-search',
          bindlist: '/pages/hy/base/cons/list/index',
          bindkey: 'cons_name',
          necessary: true
        },
        {
          label: '请购数量',
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
        http.get({ url: '/business/por-detail', params: { params: JSON.stringify({ pid: this.list.data.id }) } }).then(res => {
          if (res.status === 0) {
            this.list.data.children = res.data.map(item => {
              item.cons_id = {
                id: item.cons_id,
                cons_name: item.cons_name,
                cons_standard: item.cons_standard,
                cons_unit: item.cons_unit
              }
              return item
            })
            resolve()
          } else {
            util.ddToast({ type: 'success', text: res.message || '耗材明细请求失败' })
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

  // 保存前处理
  beforeSubmit(data) {
    data.children = data.children.map(item => {
      item.cons_name = item.cons_id.cons_name
      item.cons_standard = item.cons_id.cons_standard
      item.cons_unit = item.cons_id.cons_unit
      item.cons_id = item.cons_id.id
      return item
    })
    data.apply_person = JSON.stringify(data.apply_person[0])
    data.apply_dept = JSON.stringify(data.apply_dept[0])
    return Promise.resolve()
  },

  methods: {
    // 提交
    handleSubmit() {
      this.handlePost({
        url: '/business/por/commit',
        successText: '提交成功',
        failText: '提交失败'
      })
    }
  }
})