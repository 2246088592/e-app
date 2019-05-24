Component({
  props: {
    title: '没有设置标题',
    show: false
  },
  methods: {
    onModalClick() {
      let onModalClick = this.props.onModalClick
      if (onModalClick) {
        onModalClick()
      }
    },
    onModalClose() {
      let onModalClose = this.props.onModalClose
      if (onModalClose) {
        onModalClose()
      }
    }
  }
})