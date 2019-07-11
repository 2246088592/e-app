export default {
  methods: {
    // 清空方法
    clear() {
      if (this.props.model.disabled) {
        return
      }
      let value = `${this.path}.value`
      this.$page.setData({
        [value]: ''
      })
    }
  }
}