import request from '@/utils/request'

// 查询合作单位列表
export function listCooperation(query) {
  return request({
    url: '/module/basic/dept/list',
    method: 'get',
    params: query
  })
}

// 导出合作单位列表
export function exportCooperation(data) {
    return request({
      url: '/module/basic/dept/export',
      method: 'post',
      data: data
    })
}

// 合作单位详情
export function detailCooperation(query) {
  return request({
    url: '/module/basic/dept/getInfo',
    method: 'get',
    params: query
  })
}

