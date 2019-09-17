# 基础组件

::: tip 提示
基础组件可以配合页面渲染函数快速生成表单，参考[表单渲染函数](../../render/form.md)。
:::

## 通用属性

### path

- 类型: `string`
- 默认值: `''`

当前组件在当前页面date对象中的定位，配合表单渲染函数会自动设置此字段，也可以手动传入。

::: warning 注意
此字段设置错误会导致其他所有字段失效。
:::

### value

- 类型: `根据组件确定`
- 默认值: `根据组件确定`

|组件|类型|默认值|
|-|-|-|
|address|string|''|
|cascader|object|''|
|date-picker|string|''|
|dept-picker|array|[]|
|input|string|''|
|interval|array|['', '']|
|picker|string、object|''|
|progress-bar|number|0|
|scan|string|''|
|search|string、object|''|
|text-area|string|''|
|user-chooser|array|[]|

::: warning 注意
部分组件接收类型和默认值没有直接关系。
:::

### label

- 类型: `string`
- 默认值: `''`

标签。

### disabled

- 类型: `boolean`
- 默认值: `true`

禁用，控制是否允许人为操作。

### necessary

- 类型: `boolean`
- 默认值: `false`

是否必填，**progress-bar**组件没有此属性。

### placeholder

- 类型: `string`
- 默认值: `'必填'或''`

占位提示符，当没有手动设置时，necessary为true为'必填'，否则为''。

### validate

- 类型: `function`
- 默认值: `() => true`

默认校验方法。

::: warning 注意
此字段只有在搭配表单渲染函数时有效，否则要传入onValidate参数作为校验方法。
:::

### status

- 类型: `string`
- 默认值: `'success'或'error'`

实时的校验结果。

### notice

- 类型: `string`
- 默认值: `'不能为空'或''`

校验不通过时的错误提示，没有手动设置，necessary为true为'不能为空'，否则为''。

## 单独用法

### axml 部分

```html
<e-input model="{{model}}" onValidate="onValidate"></e-input>
```

### js 部分

```js
model: {
  path: '',
  value: '',
  label: '',
  disabled: false,
  necessary: true,
  placeholder: '必填',
  status: 'success',
  notice: '不能为空',
  ...其他属性
}

function onValidate(value) {
  if(value满足条件){
    return true
  }
  return false
}
```

## 渲染函数内用法

### js 部分

```js
model: {
  path: '',
  value: '',
  label: '',
  disabled: false,
  necessary: true,
  placeholder: '必填',
  status: 'success',
  notice: '不能为空',
  validate：(value) => {
    if('value满足条件'){
      return true
    }
    return false
  },
  ...其他属性
}
```

本栏的主要内容如下：

- [address 定位](./address.md)
- [cascader 级联选择](./cascader.md)
- [date-picker 日期时间选择](./date-picker.md)
- [dept-chooser 部门选择](./dept-chooser.md)
- [input 输入框](./input.md)
- [interval 时间区间选择](./interval.md)
- [picker 下拉选择](./picker.md)
- [progress-bar 滑块](./progress-bar.md)
- [scan 扫码输入](./scan.md)
- [search 搜索选择](./search.md)
- [switch 切换](./switch.md)
- [text-area 多行输入](./text-area.md)
- [user-chooser 人员选择](./user-chooser.md)