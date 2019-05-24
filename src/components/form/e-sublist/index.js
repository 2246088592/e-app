import util from '/src/util.js'

Component({
  props: {
    sublist: {
      template: {},
      array: []
    }
  },

  methods: {
    // 新加一行
    handleAdd() {
      let array = `${this.props.sublist.id}.array`
      let obj = util.cloneDeep(this.props.sublist.template)
      this.$page.$spliceData({
        [array]: [this.props.sublist.array.length, 0, obj]
      })
    },
    // 删除一行
    handleDelete(event) {
      let i = event.currentTarget.dataset.itemIndex
      let array = `${this.props.sublist.id}.array`
      this.$page.$spliceData({
        [array]: [i, 1, false]
      })
    }
  }
})