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
export function projectRoleList(query) {
  return request({
    url: '/project/role/list',
    method: 'get',
    params: query
  })
}

// 查询功能权限列表
export function authList(query) {
  return request({
    url: '/projectrole/auth/list',
    method: 'get',
    params: query
  })
}

// 根据项目角色ID查询功能权限下拉树结构
export function projectRoleAuthTreeSelect(projectRoleSid) {
  return request({
    url: '/projectrole/auth/projectRoleAuthTreeSelect/' + projectRoleSid,
    method: 'get'
  })
}

// 复制项目角色
export function copyProjectRole(projectRoleSid) {
  return request({
    url: '/project/role/copyProjectRole/'+ projectRoleSid,
    method: 'get'
  })
}

// 查询项目角色详细
export function getProjectRole(projectRoleSid) {
  return request({
    url: '/project/role/' + projectRoleSid,
    method: 'get'
  })
}

// 新增角色
export function addProjectRole(data) {
  return request({
    url: '/project/role',
    method: 'post',
    data: data
  })
}

// 修改项目角色
export function updateProjectRole(data) {
  return request({
    url: '/project/role',
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
export function delProjectRole(projectRoleSid) {
  return request({
    url: '/project/role/' + projectRoleSid,
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
