import request from '@/utils/request'

// 移除成员
export function removeUserFromRole(roleId,userIds) {
  return request({
    url: `/system/user/removeUserRole/${roleId}/${userIds}`,
    method: 'put'
  })
}

// 添加成员
export function addUserFromRole(roleId,userIds) {
  return request({
    url: `/system/user/setRoleUsers/${roleId}/${userIds}`,
    method: 'put'
  })
}

// 修改密码
export function changePassWord(data) {
  return request({
    url: '/user/userTreeSelect',
    method: 'put',
    data: data
  })
}

// 获取用户树
export function getUsersTree() {
  return request({
    url: '/system/user/userTreeSelect',
    method: 'get'
  })
}

// 查询项目角色模版列表
export function typeRole() {
  return request({
    url: '/system/projectRoleTemplate/optionSelect',
    method: 'get'
  })
}

// 根据项目角色模版查询人员列表
// 查询用户列表
export function listRole(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}
// 复制项目角色模版
export function copyRole(roleId) {
  return request({
    url: '/system/projectRoleTemplate/copyRoleTemplate/'+ roleId,
    method: 'get'
  })
}

// 查询项目角色模版详细
export function getRole(roleId) {
  return request({
    url: '/system/projectRoleTemplate/' + roleId,
    method: 'get'
  })
}

// 新增项目角色模版
export function addRole(data) {
  return request({
    url: '/system/projectRoleTemplate',
    method: 'post',
    data: data
  })
}

// 修改项目角色模版
export function updateRole(data) {
  return request({
    url: '/system/projectRoleTemplate',
    method: 'put',
    data: data
  })
}

// 项目角色模版数据权限
export function dataScope(data) {
  return request({
    url: '/system/projectRoleTemplate/dataScope',
    method: 'put',
    data: data
  })
}

// 项目角色模版状态修改
export function changeRoleStatus(roleId, status) {
  const data = {
    roleId,
    status
  }
  return request({
    url: '/system/projectRoleTemplate/changeStatus',
    method: 'put',
    data: data
  })
}

// 删除项目角色模版
export function delRole(roleId) {
  return request({
    url: '/system/projectRoleTemplate/' + roleId,
    method: 'delete'
  })
}

// 导出项目角色模版
export function exportRole(query) {
  return request({
    url: '/system/projectRoleTemplate/export',
    method: 'get',
    params: query
  })
}

export function pushToProject(projectRoleTemplateId) {
  return request({
    url: '/system/projectRoleTemplate/pushToProject/' + projectRoleTemplateId,
    method: 'get'
  })
}
