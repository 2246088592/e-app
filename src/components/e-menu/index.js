import { getMenuTree } from '/src/api/sys/menu.js'
import util from '/src/libs/util.js'

Component({
  data: {
    opened: {},
    loading: false,
    loadingText: '菜单加载中'
  },
  props: {
    // 每行最大菜单数
    columnNum: 4,
    // 固定菜单
    menus: [],
    // 禁止显示的菜单，此处考量是基于移动端和pc的不同，例如系统管理菜单不现实
    invisible: ['组织结构', '菜单管理', '角色管理', '权限分配', '用户管理'],
    // 背景
    background: 'rgba(25, 31, 37, .05)'
  },
  didMount() {
    this.initMenu()
  },
  methods: {
    // 初始化菜单
    initMenu() {
      this.setData({
        loading: true
      })
      getMenuTree({ mock: 'menuTree' }).then(res => {
        let menuGroup = []
        if (this.props.menus.length) {
          menuGroup = util.cloneDeep(this.props.menus)
        }
        this.formatMenu(menuGroup, res.data[0])
        this.setData({
          loading: false,
          menuGroup: menuGroup
        })
        this.saveMenu(menuGroup)
      }).catch(err => {
        this.setData({
          loading: false
        })
      })
    },

    // 保存数组到本地缓存
    saveMenu(menuGroup) {
      let array = []
      for (let i = 0; i < menuGroup.length; i++) {
        array.push(...menuGroup[i].children)
      }
      util.db.set({ dbName: 'menu', user: true, value: array })
    },

    // 格式化菜单
    formatMenu(menuGroup, menuTree) {
      if (menuTree.children) {
        let menus = []
        for (let i = 0; i < menuTree.children.length; i++) {
          let child = menuTree.children[i]
          if (this.props.invisible.includes(child.menu_name)) {
            continue
          }
          if (child.mobile_url) {
            menus.push(child)
          } else {
            this.formatMenu(menuGroup, child)
          }
        }
        if (menus.length) {
          menuGroup.push({ title: menuTree.menu_name, children: menus })
        }
      }
    },

    // 菜单点击事件
    handleTap(event) {
      let menu = event.target.dataset.menu
      dd.navigateTo({
        url: `${menu.mobile_url.split(';')[0]}`
      })
    },

    // 切换是否可见
    handleSwitch(event) {
      let i = event.currentTarget.dataset.i
      let path = `opened[${i}]`
      this.setData({
        [path]: this.data.opened[i] !== undefined ? !this.data.opened[i] : false
      })
    }
  }
})