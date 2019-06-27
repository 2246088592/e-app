export default {
  methods: {
    // 清空方法
    clear() {
      if (this.props.model.disabled) {
        return
      }
      let val = ''
      if (this.props.model.value instanceof Object) {
        val = {}
      } else if (this.props.model.value instanceof Array) {
        val = []
      }
      let value = `${this.path}.value`
      this.$page.setData({
        [value]: val
      })
    }
  }
}