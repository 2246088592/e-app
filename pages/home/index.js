import { getPermissions } from '/src/api/sys/permission.js'

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
      // 定义唯一key
      let key = `permission${getApp().globalData.userInfo.user_name}`
      // 权限持久化
      dd.setStorage({
        key: key,
        data: res.data,
        fail: (err) => {
          console.error(err)
        }
      })
    })
  }
})