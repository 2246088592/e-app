# 钉钉小程序（原E应用框架）

**本文为介绍框架使用方法**

## render函数

*render函数是生成页面（page）的一种快速方式，当需要设计的页面整页都为列表或者表单时，建议使用render生成*

### formPage.js

> 接收一个对象，可对表单业务对象初始化，支持自动表单校验，表单提交，钩子函数，可以添加自定义方法

#### 提交地址 url

类型：字符串（不用加域名，开头有/，保存用）

#### 权限标记 btnPos

类型：数字（对应动态按钮内position）

#### 表单背景 background

类型：字符串（参考CSS background属性）

#### 导航栏配置 navigationBar

类型：对象（title属性默认值为菜单对象的menu_name）
```javascript
navigationBar： {
  title: '',
  backgroundColor: ''
}
```

#### 业务对象 bizObj

类型：数组（内部为对象，对象配置参考基础组件/src/components/base）

#### 钩子函数 beforeOnLoad

触发结点为onLoad执行前，参数同query。

#### 钩子函数 afterOnLoad

触发结点为onLoad执行后，参数同query。

#### 钩子函数 formChange

触发结点为表单数据改变时，参数event，为当前发生变化的组件对象。

#### 钩子函数 beforeSubmit

触发结点为提交函数执行时，晚于校验函数（校验函数自动执行，根据bizObj内组件对象的validate方法校验），参数为自动生成的表单对象。
**注意：必须为promise方法**