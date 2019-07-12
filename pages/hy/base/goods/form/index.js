import formPage from '/src/render/formPage'
import http from '/src/http/index.js'

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
      label: '耗材分类',
      key: 'goods_class_id',
      component: 'e-cascader',
      necessary: true,
      bindkey: 'class_name'
    },
    {
      label: '耗材编号',
      key: 'goods_code',
      component: 'e-input',
      necessary: true
    },
    {
      label: '耗材名称',
      key: 'goods_name',
      component: 'e-input',
      necessary: true
    },
    {
      label: '规格型号',
      key: 'goods_spec',
      component: 'e-input'
    },
    {
      label: '计量单位',
      key: 'goods_unit',
      component: 'e-input'
    },
    {
      label: '采购单价',
      key: 'pprice',
      component: 'e-input'
    }
  ],

  // 初始化前
  beforeOnLoad() {
    if (this.list.data) {
      this.list.data.goods_class_id = { id: this.list.data.goods_class_id, class_name: this.list.data.class_name }
    }
  },

  // 初始化后请求耗材分类树
  afterOnLoad(query) {
    http.get(null, { mock: 'classTree' }).then(res => {
      this.setData({
        'bizObj[0].tree': res.data
      })
    })
  },

  // 提交前处理
  beforeSubmit(data) {
    data.goods_class_id = data.goods_class_id.id
    return Promise.resolve()
  }
})