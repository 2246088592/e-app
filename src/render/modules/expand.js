/* 扩展使用list组件的页面和表单页面 2018-11-22 13:08 */

function initList(list, query) {
  if (query.params) {
    let params = JSON.parse(query.params)
    if (params.searchOptions.bindList === list.data.listOptions.name) {
      let auth = { add: false, delete: false, check: false, filter: false }
      list.setData({
        'listOptions.type': 'search',
        'listOptions.eSearchId': params.id,
        'listOptions.params': params.searchOptions.params,
        'listOptions.searchAuth': Object.assign({}, auth, params.auth)
      })
    }
  }
}

// 初始化表单
function initForm(form, query) {
  let saveForm = {}
  if (query.saveForm) {
    saveForm = JSON.parse(query.saveForm)
    for (let key in saveForm) {
      if (form.data[key]) {
        let value = `${form.data[key].id}.value`
        form.setData({
          [value]: saveForm[key]
        })
      }
    }
  }
  if (saveForm.id && saveForm.version) {
    form.setData({
      'saveForm': saveForm,
      'type': 'edit'
    })
  } else {
    form.setData({
      'saveForm': saveForm
    })
  }
  if (form.fillForm) {
    form.fillForm()
  }
}

// 详情页面的公用方法
function initDetail(detail, query) {
  if (query.item) {
    let item = JSON.parse(query.item)
    detail.setData({
      'detailOptions.item': item
    })
  }
}

export {
  initList,
  initForm,
  initDetail
}