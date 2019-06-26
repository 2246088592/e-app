import util from '/src/libs/util.js'
import validate from '../mixins/validate.js'
import equal from '../mixins/equal.js'

Component({
  // 混合校验
  mixins: [validate, equal],
  // data
  data: {
    tree: [], // 树结构
    cascaderVisible: false, // 是否展开选择器
    array: [], // 当前可选数组
    breadcrumb: [], // 面包屑
    childrenIndexArr: [], // 带有children的子节点索引数组
    current: '', // 当前所选项
    currentIndex: '' // 当前选中对象索引
  },
  // 接收参数
  props: {
    model: {},
    // 默认校验方法
    onValidate: (value) => {
      return true
    }
  },
  // 挂载
  didMount() {
    this.init(this.props.model)
    this.initBreadcrumb()
    this.validate(this.props.model.value)
  },
  // 更新
  didUpdate(prevProps, prevData) {
    // setData后校验
    if (!this.equal(prevProps.model.value, this.props.model.value)) {
      this.validate(this.props.model.value)
    }
    if (!this.equal(prevProps.model.tree, this.props.model.tree)) {
      this.initBreadcrumb()
      this.initTree(this.props.model.tree)
    }
  },
  methods: {
    // 初始化面包屑
    initBreadcrumb() {
      this.setData({
        'current': '',
        'breadcrumb': [this.props.model.label],
        'childrenIndexArr': [this.props.model.label]
      })
    },

    // 单选切换
    radioChange(event) {
      let i = event.currentTarget.dataset.itemIndex
      let item = this.data.array[i]
      if (item.children) {
        this.$spliceData({
          'array': [0, this.data.array.length, ...item.children],
          'breadcrumb': [this.data.breadcrumb.length, 0, item[this.props.model.bindkey]],
          'childrenIndexArr': [this.data.childrenIndexArr.length, 0, i]
        })
      } else {
        this.setData({
          'current': item,
          'currentIndex': i
        })
      }
    },

    // 点击确认
    handleSelect() {
      if (!this.data.current) {
        util.ddToast('fail', '请选择一个有效值')
        return
      }
      let value = `${this.path}.value`
      this.$page.setData({
        [value]: this.data.current
      })
      this.handleClose()
    },

    // 面包屑点击
    handleBreadcrumbTap({ index, value }) {
      if (this.data.childrenIndexArr.length - 1 === index) {
        return
      }
      this.setData({
        'current': '',
        'currentIndex': ''
      })
      let arr = this.data.tree.slice(0)
      for (let i = 0; i < index; i++) {
        arr = arr[this.data.childrenIndexArr[i + 1]].children
      }
      this.$spliceData({
        'array': [0, this.data.array.length, ...arr],
        'breadcrumb': [index + 1, this.data.breadcrumb.length - index - 1],
        'childrenIndexArr': [index + 1, this.data.childrenIndexArr.length - index - 1]
      })
    },

    // 打开
    handleOpen(event) {
      if (this.props.model.disabled) {
        return
      }
      if (!this.props.model.tree.length) {
        util.ddToast('none', '没有数据')
        return
      }
      this.setData({
        'cascaderVisible': true
      })
    },

    // 关闭
    handleClose(event) {
      this.setData({
        'cascaderVisible': false
      })
    },

    // 初始化树
    initTree(tree) {
      let temp = util.cloneDeep(tree)
      let array = []
      for (let i = 0; i < temp.length; i++) {
        array.push(temp[i])
      }
      this.$spliceData({
        'array': [0, this.data.array.length, ...array],
        'tree': [0, this.data.array.length, ...array]
      })
    },

    // 初始化model的属性
    init(model) {
      // 配置path
      this.path = model.path !== undefined ? model.path : ''
      if (model.sfi !== undefined) {
        this.path = `bizObj[${model.ci}].children[${model.sfi}][${model.sci}]`
      } else if (model.ci !== undefined) {
        this.path = `bizObj[${model.ci}]`
      }
      // cascader对象
      let cascader = {
        mock: '',
        tree: [],
        value: '',
        label: '',
        status: '',
        bindkey: '',
        disabled: false,
        necessary: false,
        placeholder: model.necessary ? '必填' : '',
        notice: model.necessary ? '不能为空' : ''
      }
      this.$page.setData({
        [this.path]: Object.assign(cascader, model) // 补全属性
      })
      // 初始化完成后初始化树
      this.initTree(cascader.tree)
    }
  }
})