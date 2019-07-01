import formPage from '/src/render/formPage'

formPage({
  // 权限标记，对应按钮的position
  btnPos: 1,

  // 业务对象
  bizObj: [
    {
      label: '耗材编号',
      key: 'good_code',
      component: 'e-input',
      necessary: true
    },
    {
      label: '耗材分类',
      key: 'good_type',
      component: 'e-cascader',
      necessary: true,
      bindkey: 'name',
      tree: [
        {
          name: '医用耗材',
          children: [
            { name: '针头' },
            { name: '针筒' },
            { name: '导尿管' },
            { name: '留置针' },
            { name: '手套/指套' },
            { name: '绷带' },
            { name: '钳子' },
            { name: '集尿袋' },
            { name: '棉签/棉球' },
            { name: '皮条' },
            { name: '纱布' },
            { name: '砂轮' },
            { name: '缝线' },
            { name: '手腕带 男' },
            { name: '手腕带 女' },
            { name: '医用剪刀' },
            { name: '瓶口贴' },
            { name: '输液贴' },
            { name: '体温表' },
            { name: '血压计' },
            { name: '听诊器' },
            { name: '口表盒 白色14*9*4.5CM' },
            { name: '温脉绘画仪' },
            { name: '橡皮膏' },
            { name: '压敏胶带' },
            { name: '氧气袋' },
            { name: '一次性用品' },
            { name: '医用手术贴膜' },
            { name: '5M灭菌线团' },
            { name: '紫外线强度指示卡' },
            { name: '诊察床床垫' },
            { name: '3L针眼贴' },
            { name: '3M灭菌书写指示胶带' },
            { name: '3M压力蒸汽灭菌包内化学指示卡' },
            { name: '不锈钢镊子' },
            { name: '不锈钢治疗盘25*30' },
            { name: '测氯试纸' },
            { name: '持针器' },
            { name: '泪道冲洗针' },
            { name: '约束带' },
            { name: '止血带' },
          ]
        },
        {
          name: '办公用品',
          children: [
            { name: '纸' },
            { name: '资料册' },
            { name: '笔' },
            { name: '卷笔刀' },
            { name: '胶水' },
            { name: '夹子' },
            { name: '本子' },
            { name: '文件袋' },
            { name: '文件插页 A4' },
            { name: '文件盒 蓝' },
            { name: '台式 文件栏' },
            { name: '印油/印台' },
            { name: '海绵缸' },
            { name: '尺' },
          ]
        }
      ]
    },
    {
      label: '耗材名称',
      key: 'good_name',
      component: 'e-input',
      necessary: true
    },
    {
      label: '规格型号',
      key: 'good_spec',
      component: 'e-input'
    },
    {
      label: '计量单位',
      key: 'good_unit',
      component: 'e-input'
    },
    {
      label: '采购单价',
      key: 'good_price',
      component: 'e-input',
      necessary: true
    }
  ],

  // 表单change事件
  formChange(event) {
    console.log(event)
  },

  // 业务方法
  methods: {

  }
})