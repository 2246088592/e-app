# address 定位

::: tip 提示
设置只允许GPS定位的方法是设置gps为true，设置disabled为true
:::

## 个性属性

### gps

- 类型: `boolean`
- 默认值: `true`

是否允许使用GPS定位，此字段与disabled不冲突，disabled只会控制是否能人为输入。

### location

- 类型: `object`
- 默认值: `{}`

原始定位数据。

### focus

- 类型: `boolean`
- 默认值: `false`

是否获取输入框焦点。

### maxlength

- 类型: `number`
- 默认值: `200`

最大输入长度。