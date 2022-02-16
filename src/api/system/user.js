import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询角色列表
export function typeRole() {
  return request({
    url: '/system/role/optionselect',
    method: 'get'
  })
}

// 查询角色列表
export function typeRole1() {
  return request({
    url: '/system/role/optionselect1',
    method: 'get'
  })
}

// 人员部门划转
export function switchDept(deptId,userIds) {
  return request({
    url: `/system/user/batchSetUserDept/${deptId}/${userIds}`,
    method: 'put'
  })
}

// 设置部门负责人
export function setDeptLeader(data) {
  return request({
    url: '/system/dept/setLeader',
    method: 'put',
    params: data
  })
}

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(userId, deptId) {
  return request({
    url: '/system/user/getInfo',
    method: 'post',
    data: {
      'userId': userId,
      'deptId': deptId
    }
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/system/user',
    method: 'put',
    data: data
  })
}
//获取用户详情
export function getUserDetailInfo(userId) {
  return request({
    url: '/system/user/getInfo',
    method: 'post',
    data: {
      userId: userId
    }
  })
}
// 删除用户
export function delUser(userId) {
  return request({
    url: '/system/user/' + userId,
    method: 'delete'
  })
}
//修改用户
export function editUser(user) {
  return request({
    url: '/system/user',
    method: 'put',
    data:user
  })
}
// 导出用户
export function exportUser(query) {
  return request({
    url: '/system/user/export',
    method: 'get',
    params: query
  })
}

// 用户密码重置
export function resetUserPwd(userId, password) {
  const data = {
    userId,
    password
  }
  return request({
    url: '/system/user/resetPwd',
    method: 'put',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(userIds, status) {
  const data = {
    userIds,
    status
  }
  return request({
    url: '/system/user/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data: data
  })
}

// 下载用户导入模板
export function importTemplate() {
  return request({
    url: '/system/user/importTemplate',
    method: 'get'
  })
}

/*查询人员/system/user/getBaseUserlist*/
export function getBaseUserlist(query) {
  return request({
    url: '/system/user/getBaseUserlist',
    method: 'get',
    params:query
  })
}
// 根据部门查询成员接口
export function getUserList(query) {
  return request({
    url: '/system/user/getUserList',
    method: 'get',
    params:query
  })
}



/**
 * 查询用户布局
 * @param query
 * @returns {AxiosPromise}
 */
export function userLayout() {
  return request({
    url: '/system/userLayout',
    method: 'get',
  })
}

/**
 * 保存用户布局
 * @param data
 * @returns {AxiosPromise}
 */
export function saveUserLayout(data) {
  return request({
    url: '/system/userLayout',
    method: 'post',
    data: data
  })
}
