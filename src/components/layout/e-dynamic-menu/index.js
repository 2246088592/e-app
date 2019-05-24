import { getMenuTree } from '/src/api/sys/menu.js'
import staticMenu from '/src/static-menu.js'

Component({
  data: {
    // 固定菜单
    staticMenu: staticMenu,
    // 每行最大菜单数
    columnNum: 4,
    // 菜单列表
    list: [
      {
        title: '申购单',
        key: 'purchase',
        icon: 'cube',
      }
    ]
  },
  didMount() {
    this.initMenu()
  },
  methods: {
    // 初始化菜单
    initMenu() {
      getMenuTree().then(res => {
        console.log(this.data.staticMenu, res)
      })
    },
    // 菜单点击事件
    handleTap(event) {
      let path = event.target.dataset.path
      dd.navigateTo({
        url: `/pages/${path}/index`
      })
    }
  }
})