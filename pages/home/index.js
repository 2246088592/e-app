import { getPermissions } from '/src/api/sys/permission.js'
import util from '/src/libs/util.js'

Page({
  data: {
    // // 每行最多菜单数
    // column: 4,

    // 禁止显示的菜单，此处考量是基于移动端和pc的不同，例如系统管理菜单
    disabled: ['组织结构', '菜单管理', '角色管理', '权限分配', '用户管理'],

    // // 背景，默认rgba(0, 0, 0, 0)
    // background: '',

    // 静态菜单
    staticMenuGroup: [
      {
        title: '基础资料',
        children: [
          {
            icon_cls: 'cube',
            menu_name: '耗材资料',
            mobile_url: '/pages/hy/base/goods/list/index;/pages/hy/base/goods/form/index',
            xtype: 'warning',
            id: 'goods',
            permission: [
              {
                "position": 1,
                "action_name": "新增",
                "xtype": "primary",
                "icon_cls": "plus",
                "handler": 'handleAdd'
              },
              {
                "position": 12,
                "action_name": "删除",
                "xtype": "primary",
                "icon_cls": "trash",
                "handler": 'handleDelete'
              },
              {
                "position": 2,
                "action_name": "保存",
                "xtype": "primary",
                "icon_cls": "save",
                "handler": 'saveForm'
              }
            ]
          },
          {
            icon_cls: 'cube',
            menu_name: '仓库资料',
            mobile_url: '/pages/hy/base/wh/list/index;/pages/hy/base/wh/form/index',
            xtype: 'warning',
            id: 'wh',
            permission: [
              {
                "position": 1,
                "action_name": "新增",
                "xtype": "primary",
                "icon_cls": "plus",
                "handler": 'handleAdd'
              },
              {
                "position": 12,
                "action_name": "删除",
                "xtype": "primary",
                "icon_cls": "trash",
                "handler": 'handleDelete'
              },
              {
                "position": 2,
                "action_name": "保存",
                "xtype": "primary",
                "icon_cls": "save",
                "handler": 'saveForm'
              }
            ]
          },
          {
            icon_cls: 'cube',
            menu_name: '供应商资料',
            mobile_url: '/pages/hy/base/ven/list/index;/pages/hy/base/ven/form/index',
            xtype: 'warning',
            id: 'ven',
            permission: [
              {
                "position": 1,
                "action_name": "新增",
                "xtype": "primary",
                "icon_cls": "plus",
                "handler": 'handleAdd'
              },
              {
                "position": 12,
                "action_name": "删除",
                "xtype": "primary",
                "icon_cls": "trash",
                "handler": 'handleDelete'
              },
              {
                "position": 2,
                "action_name": "保存",
                "xtype": "primary",
                "icon_cls": "save",
                "handler": 'saveForm'
              }
            ]
          },
          {
            icon_cls: 'cube',
            menu_name: '耗材分类资料',
            mobile_url: '/pages/hy/base/class/list/index;/pages/hy/base/class/form/index',
            xtype: 'warning',
            id: 'class',
            permission: [
              {
                "position": 1,
                "action_name": "新增",
                "xtype": "primary",
                "icon_cls": "plus",
                "handler": 'handleAdd'
              },
              {
                "position": 12,
                "action_name": "删除",
                "xtype": "primary",
                "icon_cls": "trash",
                "handler": 'handleDelete'
              },
              {
                "position": 2,
                "action_name": "保存",
                "xtype": "primary",
                "icon_cls": "save",
                "handler": 'saveForm'
              }
            ]
          }
        ]
      }
    ]
  },

  onLoad(query) {
    // 初始化固定菜单权限
    let obj = {}
    if (this.data.staticMenuGroup) {
      for (let i = 0; i < this.data.staticMenuGroup.length; i++) {
        let group = this.data.staticMenuGroup[i]
        for (let j = 0; j < group.children.length; j++) {
          let menu = group.children[j]
          if (menu.permission) {
            obj[menu.id] = menu.permission
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