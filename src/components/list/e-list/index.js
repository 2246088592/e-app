import util from '/src/util.js'
import http from '/src/http.js'

let timer = null
let app = getApp()

Component({
  data: {
    params: { // 请求参数
      pageable: true,
      page: 1,
      limit: 20,
      idField: 'id',
      sort: 'desc',
      orderBy: 'id',
      params: {}
    },
    editable: false, // 控制checkbox开关
    isLoading: false, // 是否正在加载中
    noMore: false, // 是否全部加载完成
    checkedItems: [], // 已勾选项目的id数组
    keyWord: '', // searchbox关键字
    touchMove: false, // 是否处于touchmove状态 是则禁止长按事件
    searchBoxRightBtnText: '取消', // 搜索框右侧按钮文本
    showFilter: false, // 是否显示筛选部件
    auth: { add: false, delete: false, check: false, filter: false } // 默认的列表权限
  },

  props: {
    // 接收listOptions配置文件
    listOptions: {}
  },

  didMount() {
    // 初始化列表权限
    this.initAuth()
    // 初始化searchbox右侧按钮
    this.searchBoxBlur()
    // 首次加载数据
    this.loadMore()
    // 设置page的下拉事件
    this.initPullRefresh()
    // 初始化事件监听器
    this.initEventListener()
  },

  // 更新
  didUpdate(prevProps, prevData) {
    // 多选状态更新已选项目
    if (this.data.editable) {
      this.getCheckedItems()
    }
  },

  // 组件销毁时销毁refresh事件监听器
  didUnmount() {
    app.emitter.removeListener(`${this.props.listOptions.id}_refresh`, this.refresh, this)
  },

  methods: {
    // 初始化列表权限
    initAuth() {
      let auth = `${this.props.listOptions.id}.auth`
      this.$page.setData({
        [auth]: Object.assign({}, this.data.auth, this.props.listOptions.auth)
      })
    },

    // 初始化事件监听器
    initEventListener() {
      app.emitter.on(`${this.props.listOptions.id}_refresh`, this.refresh, this)
    },

    // refresh方法
    refresh(event) {
      if (event.detail.listId === this.props.listOptions.id) {
        this.reset('')
      }
    },

    // 重置过滤条件
    async resetFilter() {
      let filterParams = {}
      for (let key in this.$page.data) {
        let temp = this.$page.data[key]
        if (temp.id && temp.label && key === temp.id) {
          let value = `${key}.value`
          this.$page.setData({
            [value]: ''
          })
          filterParams[temp.id] = ''
        }
      }
      let params = `${this.props.listOptions.id}.params`
      this.$page.setData({
        [params]: Object.assign({}, this.props.listOptions.params, filterParams)
      })
      await util.sleep(100)
      this.reset('')
    },

    // 根据过滤器中的内容进行搜索
    async searchByFilter() {
      let filterParams = {}
      for (let key in this.$page.data) {
        let temp = this.$page.data[key]
        if (temp.id && temp.label && key === temp.id) {
          filterParams[temp.id] = temp.value
        }
      }
      let params = `${this.props.listOptions.id}.params`
      this.$page.setData({
        [params]: Object.assign({}, this.props.listOptions.params, filterParams)
      })
      await util.sleep(100)
      this.reset('')
    },

    // 获取已选择的项的id
    getCheckedItems() {
      let arr = []
      this.props.listOptions.array.forEach((item) => {
        if (item.checked) {
          arr.push(item.id)
        }
      })
      this.$spliceData({
        'checkedItems': [0, this.data.checkedItems.length || 0, ...arr]
      })
    },

    // 监听搜索框获取焦点
    searchBoxFocus() {
      this.setData({
        'searchBoxRightBtnText': '取消'
      })
    },

    // 监听搜索框失去焦点
    searchBoxBlur() {
      if (!this.data.keyWord) {
        this.setData({
          'searchBoxRightBtnText': '筛选'
        })
      }
    },

    // 搜索框右侧按钮点击事件
    searchBoxCancel() {
      let text = this.data.searchBoxRightBtnText
      if (text === '筛选' || text === 'filter') {
        this.setData({
          'showFilter': true
        })
      }
    },

    // 关闭过滤部件
    closeFilter() {
      this.setData({
        'showFilter': false
      })
    },

    // 搜索，延迟300ms
    searchBoxInput(value) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.reset(value)
      }, 300)
    },

    // 重置搜索框/刷新事件
    reset(value) {
      this.setData({
        'keyWord': value,
        'noMore': false,
        'params.page': 1
      })
      let array = `${this.props.listOptions.id}.array`
      this.$page.setData({
        [array]: []
      })
      this.loadMore()
    },

    // 清空搜索框
    searchBoxClear() {
      this.searchBoxInput('')
    },

    // 给当前page添加下拉刷新方法，会覆盖page的刷新方法！
    initPullRefresh() {
      this.$page.onPullDownRefresh = () => {
        this.reset(this.data.keyWord)
      }
    },

    // 加载方法
    async loadMore() {
      if (this.data.noMore || this.data.isLoading) {
        return
      }
      this.setData({
        'isLoading': true,
        'params.params': JSON.stringify({ [this.props.listOptions.bindKey]: this.data.keyWord, ...this.props.listOptions.params })
      })
      let options = {
        url: this.props.listOptions.url,
        params: this.data.params
      }
      let resp = await http.get(options)
      if (resp.status === 0) {
        let array = `${this.props.listOptions.id}.array`
        this.$page.$spliceData({
          [array]: [this.props.listOptions.array.length, 0, ...resp.data.items],
        })
        this.setData({
          'params.page': this.data.params.page += 1
        })
        if (!resp.data.items.length || resp.data.items.length < this.data.params.limit) {
          this.setData({
            'noMore': true
          })
        }
      }
      this.setData({
        'isLoading': false
      })
      this.closeFilter()
      dd.stopPullDownRefresh()
    },

    // 右下add按钮点击事件
    goAddPage() {
      let saveForm
      if (this.$page.beforeEnterForm) {
        saveForm = this.$page.beforeEnterForm()
      }
      let formPage = `/pages/${this.props.listOptions.name}/form/index`
      if (saveForm) {
        dd.navigateTo({
          url: `${formPage}?saveForm=${JSON.stringify(saveForm)}`
        })
      } else {
        dd.navigateTo({
          url: `${formPage}`
        })
      }
    },

    // 显示checkbox，打开编辑模式
    showCheckBox(event) {
      if (this.data.editable || this.data.touchMove) {
        return
      }
      let i = event.currentTarget.dataset.itemIndex
      let checked = `${this.props.listOptions.id}.array[${i}].checked`
      this.setData({
        'editable': true
      })
      this.$page.setData({
        [checked]: true
      })
    },

    // 单个项目点击事件
    selectItem(event) {
      let i = event.currentTarget.dataset.itemIndex
      let item = this.props.listOptions.array[i]
      // 编辑模式下 点击事件为切换选中状态
      if (this.data.editable) {
        this.toggleCheckeBox(i, item)
      }
      // 如果是搜索模式 则返回到e-search组件
      else if (this.props.listOptions.type === 'search') {
        app.emitter.emit(`${this.props.listOptions.eSearchId}_selectChange`, {
          detail: {
            eSearchId: this.props.listOptions.eSearchId, data: item
          }
        })
        dd.navigateBack({
          delta: 1
        })
      }
      // 否则跳转到详情页面
      else if (this.props.listOptions.type === 'search' ? this.props.listOptions.searchAuth.check : this.props.listOptions.auth.check) {
        let detailPage = `/pages/${this.props.listOptions.name}/detail/index`
        dd.navigateTo({
          url: `${detailPage}?item=${JSON.stringify(item)}`
        })
      }
    },

    // 切换单个checkbox状态
    toggleCheckeBox(index, item) {
      let key = `${this.props.listOptions.id}.array[${index}].checked`
      let checked = true
      if (item.checked) {
        checked = false
      }
      this.$page.setData({
        [key]: checked
      })
    },

    // 删除方法
    async deleteItems() {
      if (!this.data.checkedItems.length) {
        util.ddToast('fail', '请先选择需要删除的项')
        return
      }
      dd.confirm({
        title: '删除提醒',
        content: `确认删除已勾选的${this.data.checkedItems.length}项？`,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: async (result) => {
          if (!result.confirm) {
            return
          }
          let options = {
            url: this.props.listOptions.url,
            params: this.data.checkedItems,
            token: app.globalData.token
          }
          let resp = await commonDelete(options)
          if (resp.status === 0) {
            util.ddToast('success', '已删除')
            this.reset('')
          }
        }
      })
    },

    // 关闭编辑模式，清空选中值
    hideCheckBox() {
      this.setData({
        'editable': false
      })
      this.$spliceData({
        'checkedItems': [0, this.data.checkedItems.length]
      })
      this.handleSelectAll(false)
    },

    // 全选/全不选切换
    selectAll() {
      if (this.data.checkedItems.length === this.props.listOptions.array.length) {
        this.handleSelectAll(false)
        return
      }
      this.handleSelectAll(true)
    },

    // 选择函数
    handleSelectAll(checked) {
      let arr = this.props.listOptions.array.slice(0)
      for (let i = 0; i < arr.length; i++) {
        arr[i].checked = checked
      }
      let array = `${this.props.listOptions.id}.array`

      this.$page.$spliceData({
        [array]: [0, this.props.listOptions.array.length, ...arr]
      })
    },

    // 手指滑动时
    touchMove(event) {
      if (this.data.touchMove) {
        return
      }
      this.setData({
        'touchMove': true
      })
    },

    // 滑动结束
    touchEnd(event) {
      this.setData({
        'touchMove': false
      })
    }
  }
})