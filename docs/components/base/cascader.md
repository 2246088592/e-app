# cascader 级联选择

## 个性属性

### tree

- 类型: `array`
- 默认值: `[]`

原始的树结构数据。

```js
tree: [
  {
    name: '',
    children: []
  },
  {
    name: '',
    children: [
      {
        name: '',
        children: []
      }
    ]
  }
]
```

::: warning 注意
树的节点必须为对象，且子节点数组的key必须为children。
:::

### bindkey

- 类型: `string`
- 默认值: `''`

选项显示的字段。

### last

- 类型: `boolean`
- 默认值: `true`

是否只能选择最后一级。