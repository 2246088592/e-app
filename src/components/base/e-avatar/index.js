Component({
  props: {
    user: {},
    size: '80',
    className: '',
    onUserTap: () => { }
  },

  methods: {
    // 点击头像
    handleTap(event) {
      if (this.props.onUserTap) {
        this.props.onUserTap(event, this)
      }
    }
  }
})