import http from '/src/http.js'
import util from '/src/util.js'

let app = getApp()

Component({
  data: {
    openCascader: false,
    array: [], // 当前可选数组
    tree: [], // 树结构
    breadcrumbValues: [], // 面包屑
    childrenIndexArr: [], // 带有children的子节点索引数组
    current: '', // 当前所选项
    currentIndex: '' // 当前选中对象索引
  },

  props: {
    params: {},
    onValidate: (val) => {
      return true
    }
  },

  didMount() {
    this._initBreadcrumb()
    this._complete(this.props.params)
    this._validate(this.props.params.value)
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // setData后校验
    if (prevProps.params.value !== this.props.params.value) {
      this._validate(this.props.params.value)
    }
    // 搜索条件变化 重新请求选项
    if (JSON.stringify(prevProps.params.cascaderOptions.params) !== JSON.stringify(this.props.params.cascaderOptions.params)) {
      this._initBreadcrumb()
      this._initCascader(this.props.params.cascaderOptions)
    }
  },

  methods: {
    // 初始化面包屑
    _initBreadcrumb() {
      this.setData({
        'current': '',
        'breadcrumbValues': [this.props.params.label],
        'childrenIndexArr': [this.props.params.label]
      })
    },

    // 单选切换
    radioChange(event) {
      let i = event.currentTarget.dataset.itemIndex
      let item = this.data.array[i]
      if (item.children) {
        this.$spliceData({
          'array': [0, this.data.array.length, ...item.children],
          'breadcrumbValues': [this.data.breadcrumbValues.length, 0, item[this.props.params.cascaderOptions.bindKey]],
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
      let value = `${this.props.params.id}.value`
      this.$page.setData({
        [value]: this.data.current
      })
      app.emitter.emit(`${this.props.params.formId ? this.props.params.formId + '_' : ''}inputChange`, {
        detail: {
          inputId: this.props.params.id,
          objId: this.props.params.objId || null,
          sublist: this.props.params.sublist || null,
          subindex: this.props.params.subindex === 0 ? 0 : null
        }
      })
      this.handleClose()
    },

    // 面包屑点击
    onItemTap({ index, value }) {
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
        'breadcrumbValues': [index + 1, this.data.breadcrumbValues.length - index - 1],
        'childrenIndexArr': [index + 1, this.data.childrenIndexArr.length - index - 1]
      })
    },

    // 获取下拉选项
    async _initCascader(cascaderOptions) {
      if (!cascaderOptions.url) {
        if (cascaderOptions.tree) {
          this._initTree(cascaderOptions.tree)
        }
        return
      }
      let options = {
        url: cascaderOptions.url,
        params: { params: JSON.stringify(cascaderOptions.params) }
      }
      let res = await http.get(options)
      if (res.data.status === 0) {
        this._initTree(resp.data)
      }
    },

    // 打开
    handleOpen(event) {
      if (this.props.params.disabled) {
        return
      }
      this.setData({
        'openCascader': true
      })
    },

    // 关闭
    handleClose(event) {
      this.setData({
        'openCascader': false
      })
    },

    // 初始化树
    _initTree(tree) {
      let arr = []
      for (let i = 0; i < tree.length; i++) {
        arr.push(tree[i])
      }
      this.$spliceData({
        'array': [0, this.data.array.length || 0, ...arr],
        'tree': [0, this.data.array.length || 0, ...arr]
      })
    },

    // 补充params的属性
    _complete(item) {
      if (!item.id) {
        console.error('此组件内props接收的参数没有设置id')
        return
      }
      if (item.sublist) {
        item.objId = item.id
        item.id = `${item.sublist}.array[${item.subindex}].${item.id}`
      }
      let obj = {
        value: '',
        label: '',
        status: '',
        disabled: false,
        necessary: false,
        placeholder: item.necessary ? '必填' : '',
        notice: item.necessary ? '不能为空' : ''
      }
      let temp = item
      for (let key in obj) {
        if (!temp[key]) {
          temp[key] = obj[key]
        }
      }
      temp.cascaderOptions = Object.assign({
        bindKey: '',
        params: {}
      }, item.cascaderOptions)
      let id = `${temp.id}`
      this.$page.setData({
        [id]: temp
      })
      // 初始化完成后请求选项
      this._initCascader(temp.cascaderOptions)
    },

    // 校验方法
    _validate(val) {
      let result = ''
      if (this.props.params.necessary) {
        if (!val) {
          result = 'error'
        } else {
          result = this.props.onValidate(val) ? 'success' : 'error'
        }
      } else {
        if (!val) {
          result = ''
        } else {
          result = this.props.onValidate(val) ? 'success' : 'error'
        }
      }
      if (this.props.params.status === result) {
        return
      }
      let status = `${this.props.params.id}.status`
      this.$page.setData({
        [status]: result
      })
    }
  }
})