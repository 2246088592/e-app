import { getPermissions } from '/src/api/sys/permission.js'
import util from '/src/util.js'

Page({
  data: {
    // 当行最多菜单数
    columnNum: 4,
    // 禁止显示的菜单，此处考量是基于移动端和pc的不同，例如系统管理菜单不现实
    invisible: [],
    // 固定菜单
    menus: {
      children: [
        {
          icon_cls: 'cubes',
          menu_name: '物资申请',
          mobile_url: '/pages/purchasing/form/index',
          id: 'testid'
        }
      ]
    }
  },

  onLoad(query) {
    // 获取权限
    getPermissions({ mock: 'permission' }).then(res => {
      util.db.set({ dbName: 'permission', user: true, value: res.data })
    })
  }
})