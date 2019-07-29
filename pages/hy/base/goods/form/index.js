import formPage from '/src/render/formPage'
import http from '/src/http/index.js'
import util from '/src/libs/util.js'
import { on_amount } from '/src/assets/js/RegExp.js'

formPage({
  // 提交地址
  url: '/business/consumables',

  // 权限标记，对应按钮的position
  btnPos: 2,

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
      label: '耗材分类',
      key: 'item_class_id',
      component: 'e-cascader',
      necessary: true,
      bindkey: 'item_name'
    },
    {
      label: '耗材编号',
      key: 'cons_code',
      component: 'e-input',
      necessary: true
    },
    {
      label: '耗材名称',
      key: 'cons_name',
      component: 'e-input',
      necessary: true,
      maxlength: 50
    },
    {
      label: '规格',
      key: 'cons_standard',
      component: 'e-input',
      maxlength: 50
    },
    {
      label: '单位',
      key: 'cons_unit',
      component: 'e-input',
      maxlength: 50
    },
    {
      label: '最新单价',
      key: 'unit_price',
      component: 'e-input',
      number: true,
      notice: '格式不正确，请输入至多两位小数的正数',
      validate: (val) => {
        return on_amount(val)
      }
    },
    {
      label: '备注',
      key: 'remark',
      component: 'e-text-area',
      maxlength: 200
    }
  ],

  // 初始化前
  beforeOnLoad() {
    if (this.list.data) {
      this.list.data.item_class_id = {
        id: this.list.data.item_class_id,
        item_name: this.list.data.item_name
      }
    }
  },

  // 初始化后请求耗材分类树
  afterOnLoad(query) {
    http.get({ url: '/business/item-class' }).then(res => {
      if (res.status === 0) {
        this.setData({
          'bizObj[0].tree': res.data
        })
      } else {
        util.ddToast({ type: 'fail', text: res.message || '耗材分类请求失败' })
      }
    })
  },

  // 提交前处理
  beforeSubmit(data) {
    data.item_class_id = data.item_class_id.id
    return Promise.resolve()
  }
})