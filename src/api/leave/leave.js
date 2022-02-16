import request from '@/utils/request'

// 请休假列表
export function leaveList(query) {
  return request({
    url: '/modules/workHours/application/list',
    method: 'get',
    params: query
  })
}

/**
 * 请休假详情
 * @param applyId 请假申请id
 */
export function leaveDetail(applyId) {
  return request({
    url: '/modules/workHours/application/'+applyId,
    method: 'get',
  })
}

// 请假，明细
export function leaveDetailList(query) {
  return request({
    url: '/modules/workHours/application/detailed_list',
    method: 'get',
    params: query
  })
}

// 新增请假
export function addLeave(data) {
  return request({
    url: '/modules/workHours/application',
    method: 'post',
    data: data
  })
}


// 修改请假
export function updateLeave(data) {
    return request({
        url: '/modules/workHours/application',
        method: 'put',
        data: data
    })
}

// 删除请假
export function deleteLeave(leaveId) {
    return request({
        url: `modules/workHours/application/${leaveId}`,
        method: 'delete',
    })
}

// 选择人员
export function leaveUserList(query) {
  return request({
    url: '/modules/workHours/application/user_list',
    method: 'get',
    params: query
  })
}



