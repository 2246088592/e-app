import formPage from '/src/render/formPage'
import http from '/src/http/index.js'

formPage({
  // 提交地址
  url: '/business/item-class',

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
    // {
    //   label: '上级分类',
    //   key: 'pid',
    //   component: 'e-cascader',
    //   last: false,
    //   bindkey: 'item_name'
    // },
    {
      label: '分类名称',
      key: 'item_name',
      component: 'e-input',
      necessary: true,
      maxlength: 50,
      notice: '值必须是"cjl"',
      validate: (val) => {
        return val === 'cjl'
      }
    },
    // {
    //   label: '备注',
    //   key: 'remark1',
    //   component: 'e-text-area',
    //   maxlength: 200,
    //   necessary: true,
    //   value: '备注1'

  ],

  // 初始化前
  beforeOnLoad() {
    // if (this.list.data) {
    //   this.list.data.pid = { id: this.list.data.pid, item_name: this.list.data.p_item_name }
    // }
  },

  // 初始化后请求耗材分类树
  afterOnLoad(query) {
    // http.get(null, { mock: 'classTree' }).then(res => {
    //   this.setData({
    //     'bizObj[0].tree': res.data
    //   })
    // })
  },

  // 提交前处理
  beforeSubmit(data) {
    // data.pid = data.pid.id
    return Promise.resolve()
  }
})