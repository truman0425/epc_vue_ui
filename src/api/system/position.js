import request from '@/utils/request'

//查询所有岗位信息
export function listTreeposition() {
  return request({
    url: '/system/position',
    method: 'get',
  })
}
// 查询岗位列表
export function listposition(query) {
  return request({
    url: '/system/position/list',
    method: 'get',
    params: query
  })
}

// 查询岗位详细
export function getPosition(positionId) {
  return request({
    url: '/system/position/' + positionId,
    method: 'get'
  })
}

// 新增岗位
export function addPosition(data) {
  return request({
    url: '/system/position',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePosition(data) {
  return request({
    url: '/system/position',
    method: 'put',
    data: data
  })
}

// 删除岗位
export function delPosition(positionId) {
  return request({
    url: '/system/position/' + positionId,
    method: 'delete'
  })
}

//复制岗位
export function copyPosition(positionId) {
  return request({
    url: '/system/position/copyPosition/' + positionId,
    method: 'get'
  })
}
//岗位菜单树-返回菜单树和选中项
export function positionMenuTreeselect(positionId) {
  return request({
    url: '/system/menu/positionMenuTreeselect/' + positionId,
    method: 'get'
  })
}
//获取所有岗位名称/id
export function getAllPositionList() {
  return request({
    url: '/system/position/getAllList',
    method: 'get'
  })
}
//根据部门查询人员列表
export function getUserListBydeptId(query) {
  return request({
    url: '/system/user/getUserList',
    method: 'get',
    params: query
  })
}
//根据岗位查询人员列表
export function getPositionUserList(query) {
  return request({
    url: '/system/position/getPositionUserList',
    method: 'get',
    params: query
  })
}
