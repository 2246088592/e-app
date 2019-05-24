Component({
  data: {
    hidden: false
  },
  props: {
    title: '标题',
    fontSize: 40
  },
  methods: {
    handleTap() {
      this.setData({
        'hidden': !this.data.hidden
      })
    }
  }
})