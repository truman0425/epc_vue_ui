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

// 查询角色列表
export function typeRole(searchValue) {
  return request({
    url: '/system/projectRole/optionselect/' + searchValue,
    method: 'get'
  })
}

// 根据角色查询人员列表
// 查询用户列表
export function listUser(projectSid, roleId) {
  return request({
    url: '/system/user/projectUserList/' + projectSid + "/" + roleId,
    method: 'get'
  })
}
// 复制角色
export function copyRole(roleId) {
  return request({
    url: '/system/projectRole/copyProjectRole/'+ roleId,
    method: 'get'
  })
}

// 查询角色详细
export function getRole(roleId) {
  return request({
    url: '/system/projectRole/' + roleId,
    method: 'get'
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/system/projectRole',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/system/projectRole',
    method: 'put',
    data: data
  })
}

// 角色数据权限
export function dataScope(data) {
  return request({
    url: '/system/projectRole/dataScope',
    method: 'put',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const data = {
    roleId,
    status
  }
  return request({
    url: '/system/projectRole/changeStatus',
    method: 'put',
    data: data
  })
}

// 删除角色
export function delRole(roleId) {
  return request({
    url: '/system/projectRole/' + roleId,
    method: 'delete'
  })
}

// 导出角色
export function exportRole(query) {
  return request({
    url: '/system/projectRole/export',
    method: 'get',
    params: query
  })
}

// 查询项目列表
export function projectList(deptId) {
  return request({
    url: '/system/projectRole/getProjectList/' + deptId,
    method: 'get'
  })
}
