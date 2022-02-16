import request from '@/utils/request'

// 查询部门列表
export function listDept(query) {
  return request({
    url: '/system/dept/list',
    method: 'get',
    params: query
  })
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId) {
  return request({
    url: '/system/dept/list/exclude/' + deptId,
    method: 'get'
  })
}

// 查询部门详细
export function getDept(deptId) {
  return request({
    url: '/system/dept/' + deptId,
    method: 'get'
  })
}

export function selectDeptByParentId(parentId) {
  return request({
    url: '/system/dept/get/' + parentId,
    method: 'get'
  })
}

// 查询部门下拉树结构
export function treeselect() {
  return request({
    url: '/system/dept/treeselect',
    method: 'get'
  })
}

// 查询当前用户可以切换的公司下拉树结构（如果具有某公司的角色则可以切换）
export function switchCompanyTreeSelect() {
  return request({
    url: '/system/dept/switchCompanyTreeSelect',
    method: 'get'
  })
}

// 查询公司级部门下拉树结构
export function companyTreeSelect() {
  return request({
    url: '/system/dept/companyTreeSelect',
    method: 'get'
  })
}

// 根据角色ID查询部门树结构
export function roleDeptTreeselect(roleId) {
  return request({
    url: '/system/dept/roleDeptTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增部门
export function addDept(data) {
  return request({
    url: '/system/dept',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data) {
  return request({
    url: '/system/dept',
    method: 'put',
    data: data
  })
}

// 删除部门
export function delDept(deptId) {
  return request({
    url: '/system/dept/' + deptId,
    method: 'delete'
  })
}

export function switchCompany(data) {
  return request({
    url: '/switchCompany',
    method: 'post',
    data: data
  })
}

//根据用户id查询部门信息
export function getDeptInfoByUserId(userId) {
  return request({
    url: 'system/dept/getDeptInfoByUserId?userId=' + userId,
    method: 'get'
  })
}
