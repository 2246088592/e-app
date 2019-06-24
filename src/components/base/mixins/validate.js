let app = getApp()

export default {
  methods: {
    // 校验方法
    validate(value) {
      let result = ''
      if (this.props.model.necessary) {
        if (!value) {
          result = 'error'
        } else {
          result = this.props.onValidate(value) ? 'success' : 'error'
        }
      } else {
        if (value) {
          result = this.props.onValidate(value) ? 'success' : 'error'
        }
      }
      if (this.props.model.fid) {
        app.emitter.emit(`${this.props.model.fid}`, Object.assign({ ...this.props.model }, { status: result }))
      }
      if (this.props.model.status === result) {
        return
      }
      let status = `${this.path}.status`
      this.$page.setData({
        [status]: result
      })
    }
  }
}