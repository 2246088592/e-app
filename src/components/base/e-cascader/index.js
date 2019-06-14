import http from '/src/http/index.js'
import util from '/src/libs/util.js'

let app = getApp()

Component({
  data: {
    tree: [], // 树结构
    cascaderVisible: false, // 是否展开选择器
    array: [], // 当前可选数组
    breadcrumb: [], // 面包屑
    childrenIndexArr: [], // 带有children的子节点索引数组
    current: '', // 当前所选项
    currentIndex: '' // 当前选中对象索引
  },

  props: {
    model: {},
    // 默认校验方法
    onValidate: (value) => {
      return true
    }
  },

  didMount() {
    this.init(this.props.model)
    this.initBreadcrumb()
    this.validate(this.props.model.value)
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // setData后校验
    if (prevProps.model.value !== this.props.model.value) {
      this.validate(this.props.model.value)
    }
    // 搜索条件变化 重新请求选项
    if (JSON.stringify(prevProps.model.options.params) !== JSON.stringify(this.props.model.options.params)) {
      this.initBreadcrumb()
      this.initCascader(this.props.model.options)
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
          'breadcrumb': [this.data.breadcrumb.length, 0, item[this.props.model.options.bindKey]],
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
      // app.emitter.emit(`${this.props.model.formId ? this.props.model.formId + '_' : ''}inputChange`, {
      //   detail: {
      //     inputId: this.props.model.id,
      //     objId: this.props.model.objId || null,
      //     sublist: this.props.model.sublist || null,
      //     subindex: this.props.model.subindex === 0 ? 0 : null
      //   }
      // })
      this.handleClose()
    },

    // 面包屑点击
    handleBreadcrumbTap({ index, value }) {
      if (this.data.childrenIndexArr.length - 1 === index) {
        return
      }
      this.setData({
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
      let array = []
      for (let i = 0; i < tree.length; i++) {
        array.push(tree[i])
      }
      this.$spliceData({
        'array': [0, this.data.array.length || 0, ...array],
        'tree': [0, this.data.array.length || 0, ...array]
      })
    },

    // 获取下拉选项
    async initCascader(options) {
      if (!options.url) {
        if (options.tree) {
          this.initTree(options.tree)
        }
        return
      }
      let res = await http.get({
        url: options.url,
        params: { params: JSON.stringify(options.params) }
      })
      if (res.data.status === 0) {
        this.initTree(resp.data)
      }
    },

    // 初始化model的属性
    init(model) {
      // 配置path
      this.path = model.sfi !== undefined ? `bizObj[${model.ci}].children[${model.sfi}][${model.sci}]` : `bizObj[${model.ci}]`
      // cascader对象
      let cascader = {
        value: '',
        label: '',
        status: '',
        disabled: false,
        necessary: false,
        placeholder: model.necessary ? '必填' : '',
        notice: model.necessary ? '不能为空' : ''
      }
      // 补全属性
      model.options = Object.assign({
        url: '',
        tree: [],
        params: {},
        bindKey: ''
      }, model.options)
      this.$page.setData({
        [this.path]: Object.assign(cascader, model)
      })
      // 初始化完成后请求选项
      this.initCascader(model.options)
    },

    // 校验方法
    validate(value) {
      let result = ''
      if (this.props.model.necessary) {
        if (!value) {
          result = 'error'
        } else {
          result = this.props.onValidate(value) ? 'success' : 'error'
        }
      } else {
        if (!value) {
          result = ''
        } else {
          result = this.props.onValidate(value) ? 'success' : 'error'
        }
      }
      if (this.props.model.status === result) {
        return
      }
      let status = `${this.path}.status`
      this.$page.setData({
        [status]: result
      })
    }
  }
})