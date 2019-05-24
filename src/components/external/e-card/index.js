Component({
  props: {
    onClick: function onClick() { },
    editable: false
  },
  methods: {
    onCardClick: function onCardClick() {
      var _props = this.props,
        info = _props.info,
        onClick = _props.onClick
      onClick({ info: info })
    }
  }
})