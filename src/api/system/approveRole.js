import request from '@/utils/request'

// 查询审批角色接口
export function getApprovalRoleList() {
  return request({
    url: '/system/approvalRole/getAllList',
    method: 'get'
  })
}

// 查询审批角色详情
export function getDept(approvalRoleId) {
  return request({
    url: '/system/approvalRole/getInfo/' + approvalRoleId,
    method: 'get'
  })
}


//添加审批角色
export function addApprovalRole(data) {
  return request({
    url: '/system/approvalRole/save',
    method: 'post',
    data: data
  })
}

// 修改审批角色
export function updateApprovalRole(data) {
  return request({
    url: '/system/approvalRole/update',
    method: 'post',
    data: data
  })
}



// 删除审批角色
export function delApprovalRole(approvalRoleIds) {
  return request({
    url: '/system/approvalRole/remove/' + approvalRoleIds,
    method: 'delete'
  })
}

//复制角色
export function copyApprovalRole(approvalRoleId) {
  return request({
    url: '/system/approvalRole/copyApprovalRole/' + approvalRoleId,
    method: 'get'
  })
}




//根据审批角色查询成员接口
export function getApprovalUserList(query) {
  return request({
    url: `/system/approvalRole/getApprovalUserList/${query.approvalRoleId}`,
    method: 'get',
    params: query
  })
}


//保存审批角色人员
export function addApprovalRoleUsers(approvalRoleId,userIds) {
  return request({
    url: `/system/user/setApprovalRoleUsers/${approvalRoleId}/${userIds}`,
    method: 'put',
  })
}

//删除审批角色人员
export function removeApprovalUserRole(approvalRoleId,userIds) {
  return request({
    url: `/system/user/removeApprovalUserRole/${approvalRoleId}/${userIds}`,
    method: 'put',
  })
}

/**
 * 获取审批部门
 * @returns {AxiosPromise}
 */
export function getManagerList() {
  return request({
    url: '/system/user/getManagerList',
    method: 'get'
  })
}

