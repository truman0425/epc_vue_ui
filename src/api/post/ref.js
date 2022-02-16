import request from '@/utils/request'

// 查询资质信息关联列表
export function listRef(query) {
  return request({
    url: '/post/ref/list',
    method: 'get',
    params: query
  })
}

// 查询资质信息关联详细
export function getRef(major) {
  return request({
    url: '/post/ref/' + major,
    method: 'get'
  })
}

// 新增资质信息关联
export function addRef(data) {
  return request({
    url: '/post/ref',
    method: 'post',
    data: data
  })
}

// 修改资质信息关联
export function updateRef(data) {
  return request({
    url: '/post/ref',
    method: 'put',
    data: data
  })
}

// 删除资质信息关联
export function delRef(major) {
  return request({
    url: '/post/ref/' + major,
    method: 'delete'
  })
}

// 导出资质信息关联
export function exportRef(query) {
  return request({
    url: '/post/ref/export',
    method: 'get',
    params: query
  })
}
