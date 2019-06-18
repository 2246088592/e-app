import { getDiary } from '/src/api/biz/diary.js'

Page({
  data: {
    cursor: 0,
    start_time: {
      label: '起始时间',
      path: 'start_time',
      necessary: true
    },
    end_time: {
      default: true,
      label: '截止时间',
      path: 'end_time',
      necessary: true
    },
    template_name: {
      label: '查询模板',
      path: 'template_name'
    },
    userid: {
      label: '员工',
      path: 'userid',
      max: 1
    },
    size: {
      value: 10,
      label: '查询数量',
      path: 'size'
    }
  },

  // 获取日志数据
  handleDiary() {
    let params = {
      start_time: new Date(Date.parse(this.data.start_time.value.replace(/-/g, "/"))).getTime(),
      end_time: new Date(Date.parse(this.data.end_time.value.replace(/-/g, "/"))).getTime(),
      cursor: this.data.cursor,
      size: this.data.size.value
    }
    getDiary(params).then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
  }
})