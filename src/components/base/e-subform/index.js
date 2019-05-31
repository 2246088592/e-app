import util from '/src/util.js'

Component({
  props: {
    model: {     }
  },

  didMount(){
    this.init(this.props.model)
  },

  methods: {
    // 初始化
    init(model){
      let subform = {
        path: `bizObj[${model.formIndex}]`,
        value: [],
        label: '',
        status: '',
        disabled: false,
        necessary: false,
        placeholder: model.necessary ? '必填' : '',
        notice: model.necessary ? '不能为空' : ''
      }
    },
    // 新加一行
    handleAdd() {
      let array = `${this.props.model.id}.array`
      let obj = util.cloneDeep(this.props.model.template)
      this.$page.$spliceData({
        [array]: [this.props.model.array.length, 0, obj]
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