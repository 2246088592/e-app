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
            icon_cls: 'flask',
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
                "xtype": "danger",
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
            icon_cls: 'truck',
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
                "xtype": "danger",
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
            icon_cls: 'sitemap',
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
                "xtype": "danger",
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
      },
      {
        title: '请购、领用',
        children: [
          {
            icon_cls: 'send',
            menu_name: '请购需求',
            mobile_url: '/pages/hy/p/request/list/index;/pages/hy/p/request/form/index',
            xtype: 'success',
            id: 'request',
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
                "xtype": "danger",
                "icon_cls": "trash",
                "handler": 'handleDelete'
              },
              {
                "position": 12,
                "action_name": "领",
                "xtype": "primary",
                "handler": 'handleConvert'
              },
              {
                "position": 12,
                "action_name": "购",
                "xtype": "success",
                "handler": 'handlePurchase'
              },
              {
                "position": 2,
                "action_name": "保存",
                "xtype": "primary",
                "icon_cls": "save",
                "handler": 'saveForm'
              },
              {
                "position": 2,
                "action_name": "提交",
                "xtype": "primary",
                "icon_cls": "paper-plane",
                "handler": 'handleSubmit'
              },
              {
                "position": 2,
                "action_name": "查看审批",
                "xtype": "primary",
                "icon_cls": "gavel",
                "handler": 'handleCheck'
              }
            ]
          },
          {
            icon_cls: 'cube',
            menu_name: '耗材领用',
            mobile_url: '/pages/hy/p/stock-out/list/index;/pages/hy/p/stock-out/form/index',
            xtype: 'success',
            id: 'stock_out',
            permission: [
              {
                "position": 2,
                "action_name": "保存",
                "xtype": "primary",
                "icon_cls": "save",
                "handler": 'saveForm'
              },
              {
                "position": 2,
                "action_name": "提交",
                "xtype": "primary",
                "icon_cls": "paper-plane",
                "handler": 'handleSubmit'
              }
            ]
          }
        ]
      },
      {
        title: '采购、入库',
        children: [
          {
            icon_cls: 'cube',
            menu_name: '采购订单',
            mobile_url: '/pages/hy/o/purchase/list/index;/pages/hy/o/purchase/form/index',
            xtype: 'danger',
            id: 'purchase',
            permission: [
              {
                "position": 2,
                "action_name": "保存",
                "xtype": "primary",
                "icon_cls": "save",
                "handler": 'saveForm'
              },
              {
                "position": 2,
                "action_name": "审核",
                "xtype": "primary",
                "icon_cls": "paper-plane",
                "handler": 'handleApprove'
              }
            ]
          },
          {
            icon_cls: 'cube',
            menu_name: '入库单',
            mobile_url: '/pages/hy/o/stock-in/list/index;/pages/hy/o/stock-in/form/index',
            xtype: 'danger',
            id: 'stock_in',
            permission: [
              {
                "position": 2,
                "action_name": "保存",
                "xtype": "primary",
                "icon_cls": "save",
                "handler": 'saveForm'
              },
              {
                "position": 2,
                "action_name": "审核",
                "xtype": "primary",
                "icon_cls": "paper-plane",
                "handler": 'handleApprove'
              }
            ]
          }
        ]
      },
      {
        title: '仓库',
        children: [
          {
            icon_cls: 'search',
            menu_name: '库存查询',
            mobile_url: '/pages/hy/stock/list/index',
            xtype: 'primary',
            id: 'stock'
          },
          {
            icon_cls: 'cubes',
            menu_name: '仓库资料',
            mobile_url: '/pages/hy/base/wh/list/index;/pages/hy/base/wh/form/index',
            xtype: 'primary',
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
                "xtype": "danger",
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