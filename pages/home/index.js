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
          icon_cls: 'tag',
          menu_name: '表单测试',
          mobile_url: '/pages/test/form/index',
          id: 'formtest',
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
          icon_cls: 'list',
          menu_name: '列表测试',
          mobile_url: '/pages/test/list/index',
          id: 'listtest',
          permission: [
            {
              "position": 1,
              "action_name": "新增",
              "xtype": "primary",
              "handler": 'handleSubmit'
            }
          ]
        },
        {
          icon_cls: 'cube',
          menu_name: '商品资料',
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
        {
          icon_cls: 'cube',
          menu_name: '仓库资料',
          mobile_url: '/pages/hy/depository/form/index',
          id: 'depository_f',
          permission: [
            {
              "position": 1,
              "action_name": "保存",
              "xtype": "primary",
              "handler": 'handleSubmit'
            }
          ]
        },
        {
          icon_cls: 'cube',
          menu_name: '供应商资料',
          mobile_url: '/pages/hy/supplier/form/index',
          id: 'supplier_f',
          permission: [
            {
              "position": 1,
              "action_name": "保存",
              "xtype": "primary",
              "handler": 'handleSubmit'
            }
          ]
        },
        {
          icon_cls: 'cube',
          menu_name: '请购申请单',
          mobile_url: '/pages/hy/request/form/index',
          id: 'request_f',
          permission: [
            {
              "position": 1,
              "action_name": "保存",
              "xtype": "primary",
              "handler": 'handleSubmit'
            },
            {
              "position": 1,
              "action_name": "提交",
              "xtype": "primary",
              "handler": 'handleSubmit'
            },
            {
              "position": 1,
              "action_name": "查看审批",
              "xtype": "success",
              "handler": 'handleSubmit'
            },
            {
              "position": 1,
              "action_name": "转领用单",
              "xtype": "warning",
              "handler": 'handleSubmit'
            }
          ]
        },
        {
          icon_cls: 'cube',
          menu_name: '采购单',
          mobile_url: '/pages/hy/purchase/form/index',
          id: 'purchase_f',
          permission: [
            {
              "position": 1,
              "action_name": "保存",
              "xtype": "primary",
              "handler": 'handleSubmit'
            },
            {
              "position": 1,
              "action_name": "审核",
              "xtype": "success",
              "handler": 'handleSubmit'
            }
          ]
        },
        {
          icon_cls: 'cube',
          menu_name: '采购入库单',
          mobile_url: '/pages/hy/stock-in/form/index',
          id: 'stock_in_f',
          permission: [
            {
              "position": 1,
              "action_name": "保存",
              "xtype": "primary",
              "handler": 'handleSubmit'
            },
            {
              "position": 1,
              "action_name": "审核",
              "xtype": "success",
              "handler": 'handleSubmit'
            }
          ]
        },
        {
          icon_cls: 'cube',
          menu_name: '耗材领用单',
          mobile_url: '/pages/hy/stock-out/form/index',
          id: 'stock_in_f',
          permission: [
            {
              "position": 1,
              "action_name": "保存",
              "xtype": "primary",
              "handler": 'handleSubmit'
            },
            {
              "position": 1,
              "action_name": "提交",
              "xtype": "success",
              "handler": 'handleSubmit'
            }
          ]
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