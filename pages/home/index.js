import { getPermissions } from '/src/api/sys/permission.js'
import util from '/src/libs/util.js'

Page({
  data: {
    // 当行最多菜单数
    columnNum: 4,
    // 固定菜单
    menus: [
      {
        title: '测试',
        children: [
          {
            icon_cls: 'list',
            menu_name: '测试列表',
            mobile_url: '/pages/test/list/index;/pages/test/form/index',
            id: 'testlist',
            permission: [
              {
                "position": 1,
                "action_name": "新增",
                "xtype": "primary",
                'icon_cls': 'plus',
                "handler": 'handleAdd'
              },
              {
                "position": 1,
                "action_name": "新增",
                "xtype": "primary",
                'icon_cls': 'plus',
                "handler": 'testAdd'
              },
              {
                "position": 1,
                "action_name": "编辑",
                "xtype": "primary",
                'icon_cls': 'edit',
                "handler": 'testEdit'
              },
              {
                "position": 1,
                "action_name": "刷新",
                "xtype": "primary",
                'icon_cls': 'refresh',
                "handler": 'testRefresh'
              },
              {
                "position": 2,
                "action_name": "删除",
                "xtype": "primary",
                'icon_cls': 'trash',
                "handler": 'handleDelete'
              }
            ]
          }
        ]
      },
      {
        title: '基础资料',
        children: [
          {
            icon_cls: 'cube',
            menu_name: '耗材资料',
            mobile_url: '/pages/hy/good/form/index',
            id: 'good_f',
            permission: [
              {
                "position": 1,
                "action_name": "保存",
                "xtype": "primary",
                "handler": 'handleSubmit'
              }
            ]
          },
        ]
      }
    ],

  },

  onLoad(query) {
    // 初始化固定菜单权限
    let obj = {}
    if (this.data.menus) {
      for (let i = 0; i < this.data.menus.length; i++) {
        let menu = this.data.menus[i]
        for (let j = 0; j < menu.children.length; j++) {
          let item = menu.children[j]
          if (item.permission) {
            obj[item.id] = item.permission
          }
        }
      }
    }
    // 获取动态菜单权限
    getPermissions({ mock: 'permission' }).then(res => {
      util.db.set({ dbName: 'permission', user: true, value: { ...obj, ...res.data } })
    })
  }
})