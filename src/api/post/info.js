import request from '@/utils/request'

// 查询岗位资质信息列表
export function listInfo(query) {
  return request({
    url: '/post/info/list',
    method: 'get',
    params: query
  })
}

// 查询岗位资质信息详细
export function getInfo(id) {
  return request({
    url: '/post/info/' + id,
    method: 'get'
  })
}

// 新增岗位资质信息
export function addInfo(data) {
  return request({
    url: '/post/info',
    method: 'post',
    data: data
  })
}

// 修改岗位资质信息
export function updateInfo(data) {
  return request({
    url: '/post/info',
    method: 'put',
    data: data
  })
}

// 删除岗位资质信息
export function delInfo(id) {
  return request({
    url: '/post/info/' + id,
    method: 'delete'
  })
}

// 导出岗位资质信息
export function exportInfo(query) {
  return request({
    url: '/post/info/export',
    method: 'get',
    params: query
  })
}

// 下载岗位资质导入模板
export function importTemplate() {
  return request({
    url: '/post/info/importTemplate',
    method: 'get'
  })
}

// 查询所有用户列表
export function getAllUserInfo() {
  return request({
    url: '/post/info/getAllUserInfo',
    method: 'get'
  })
}

// 根据用户id查询出用户所在部门
export function queryDeptByUserId(userId) {
  return request({
    url: '/post/info/queryDeptByUserId/' + userId,
    method: 'get'
  })
}
