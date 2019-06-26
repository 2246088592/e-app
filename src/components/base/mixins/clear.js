export default {
  methods: {
    // 清空方法
    clear() {
      let value = `${this.path}.value`
      this.$page.setData({
        [value]: ''
      })
    }
  }
}