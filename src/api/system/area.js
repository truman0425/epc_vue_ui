import request from '@/utils/request'

// 查询国家地域(sys_area)列表
export function listArea(query) {
  return request({
    url: '/system/area/list',
    method: 'get',
    params: query
  })
}

// 查询国家地域(sys_area)详细
export function getArea(id) {
  return request({
    url: '/system/area/' + id,
    method: 'get'
  })
}

// 新增国家地域(sys_area)
export function addArea(data) {
  return request({
    url: '/system/area',
    method: 'post',
    data: data
  })
}

// 修改国家地域(sys_area)
export function updateArea(data) {
  return request({
    url: '/system/area',
    method: 'put',
    data: data
  })
}

// 删除国家地域(sys_area)
export function delArea(id) {
  return request({
    url: '/system/area/' + id,
    method: 'delete'
  })
}

// 导出国家地域(sys_area)
export function exportArea(query) {
  return request({
    url: '/system/area/export',
    method: 'get',
    params: query
  })
}