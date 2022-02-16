import request from '@/utils/request'

// 查询用印申请列表
export function listApply(query) {
  return request({
    url: '/sealApply/list',
    method: 'get',
    params: query
  })
}

// 查询用印申请详细
export function getApply(id) {
  return request({
    url: '/system/apply/' + id,
    method: 'get'
  })
}

// 新增用印申请
export function addApply(data) {
  return request({
    url: '/system/apply',
    method: 'post',
    data: data
  })
}

// 修改用印申请
export function updateApply(data) {
  return request({
    url: '/system/apply',
    method: 'put',
    data: data
  })
}

// 删除用印申请
export function delApply(id) {
  return request({
    url: '/sealApply/delete/' + id,
    method: 'get'
  })
}

// 导出用印申请
export function exportApply(query) {
  return request({
    url: '/sealApply/export',///sealApply/export /system/apply/export
    method: 'get',
    params: query
  })
}

///sealApply/getAddInfo  新增获取默认数据
export function getAddInfo() {
  return request({
    url: '/sealApply/getAddInfo',
    method: 'get',
  })
}
export function getInfoById(id) {
  return request({
    url: '/sealApply/getInfoById/'+id,
    method: 'get',
  })
}
export function saveAllData(query) {
  return request({
    url: '/sealApply/saveAllData',
    method: 'post',
    data:query
  })
}

export function getCascadeData(typeCode) {
  return request({
    url: '/system/cascadeData/getCascadeData/'+typeCode,
    method: 'get',
  })
}

/**/
