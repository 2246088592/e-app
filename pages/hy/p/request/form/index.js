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
      necessary: true
    },
    {
      label: '申请时间',
      key: 'doc_date',
      component: 'e-date-picker',
      default: true,
      disabled: true,
      format: 'yyyy-MM-dd'
    },
    {
      label: '申请人',
      key: 'apply_user_id',
      component: 'e-user-chooser',
      default: true
    },
    {
      label: '申请部门',
      key: 'apply_org_id',
      component: 'e-dept-chooser',
      necessary: true
    },
    {
      label: '备注',
      key: 'remark',
      component: 'e-text-area',
      maxlength: 500
    },
    {
      label: '耗材',
      key: 'goods',
      component: 'e-subform',
      subform: [
        {
          label: '耗材名称',
          key: 'goods_id',
          component: 'e-search',
          bindlist: '/pages/hy/base/goods/list/index',
          bindkey: 'goods_name',
          necessary: true
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
        // 配置已选人员
        this.list.data.apply_user_id = [{
          userId: this.list.data.apply_user_id,
          name: this.list.data.apply_user_name,
          avatar: this.list.data.apply_user_avatar
        }]
        // 配置已选部门
        this.list.data.apply_org_id = [{
          id: this.list.data.apply_org_id,
          name: this.list.data.apply_org_name
        }]
        // 获取耗材明细
        http.get(null, { mock: 'requestDetail' }).then(res => {
          this.list.data.goods = res.data.goods.map(item => {
            return {
              apply_qty: item.apply_qty,
              goods_id: {
                id: item.goods_id,
                goods_name: item.goods_name
              }
            }
          })
          resolve()
        })
      } else {
        resolve()
      }
    })
  },

  // 保存前处理
  beforeSubmit(data) {
    data.apply_org_id = data.apply_org_id[0].id
    data.apply_user_id = data.apply_user_id[0].userId
    data.goods = data.goods.map(item => {
      return { apply_qty: item.apply_qty, goods_id: item.goods_id.id }
    })
    return Promise.resolve()
  },

  methods: {
    // 提交
    async handleSubmit() {
      this.test = 111
      if (!this.handleValidate()) {
        return
      }
      let data = this.formatForm()
      data.apply_org_id = data.apply_org_id[0].id
      data.apply_user_id = data.apply_user_id[0].userId
      data.goods = data.goods.map(item => {
        return { apply_qty: item.apply_qty, goods_id: item.goods_id.id }
      })
      let options = {
        url: '',
        params: this.list.data ? Object.assign(this.list.data, data) : data
      }
      http.post(options).then(res => {
        if (res.status === 0) {
          util.ddToast({ type: 'success', text: '提交成功' })
          app.emitter.emit(this.list.lid, {
            type: data.id ? 'edit' : 'add',
            index: this.list.index || undefined,
            data: res.data
          })
          dd.navigateBack({
            delta: 1
          })
        } else {
          util.ddToast({ type: 'fail', text: '提交失败' })
        }
      })
    },

    // 查看审批流
    handleCheck() {
      if (this.list.data) {
        dd.navigateTo({
          url: `/pages/process/index?form=${JSON.stringify(this.list.data)}`
        })
      } else {
        util.ddToast({ type: 'fail', text: '提交成功后可查看审批状态' })
      }
    }
  }
})