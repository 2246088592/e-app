export default {
  methods: {
    // 校验方法
    equal(a, b) {
      if (typeof a === 'function' || typeof b === 'function') {
        return false
      }
      if (typeof a !== typeof b) {
        return false
      }
      if (typeof a === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
      }
      return a === b
    }
  }
}