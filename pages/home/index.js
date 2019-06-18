import { getPermissions } from '/src/api/sys/permission.js'
import util from '/src/libs/util.js'

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
          icon_cls: 'cube',
          menu_name: '物品申请',
          mobile_url: '/pages/purchasing/form/index',
          id: 'purchasing',
          permission: [
            {
              "position": 1,
              "action_name": "提交",
              "xtype": "primary",
              "handler": 'handleSubmit'
            }
          ]
        },
        {
          icon_cls: 'tag',
          menu_name: '表单测试',
          mobile_url: '/pages/test/form/index',
          id: 'formtest'
        }
      ]
    }
  },

  onLoad(query) {
    // 初始化固定菜单权限
    let obj = {}
    if (this.data.menus && this.data.menus.children.length) {
      for (let i = 0; i < this.data.menus.children.length; i++) {
        let menu = this.data.menus.children[i]
        if (menu.permission && menu.permission.length) {
          obj[menu.id] = menu.permission
        }
      }
    }
    // 获取动态菜单权限
    getPermissions({ mock: 'permission' }).then(res => {
      util.db.set({ dbName: 'permission', user: true, value: { ...obj, ...res.data } })
    })
  }
})