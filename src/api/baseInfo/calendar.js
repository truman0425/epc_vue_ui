import request from '@/utils/request'

// 查询日历信息
export function listCalendar(query) {
  return request({
    url: '/module/basic/calendar/list',
    method: 'get',
    params: query
  })
}

// 保存日历
export function saveCalendar(data) {
    return request({
      url: '/module/basic/calendar/edit',
      method: 'put',
      data: data
    })
}

