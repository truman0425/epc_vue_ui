import request from '@/utils/request'

// 个人工时填报列表
export function workHoursList(query) {
  return request({
    url: '/modules/workHours/workhoursfill/list',
    method: 'get',
    params: query
  })
}

/**
 *  工时新增
 */
export function addWorkHours(data) {
  return request({
    url: '/modules/workHours/workhoursfill/save',
    method: 'post',
    data: data
  })
}

// 修改工时
export function updateWorkHours(data) {
  return request({
    url: '/modules/workHours/workhoursfill/edit',
    method: 'put',
    data: data
  })
}

// 删除工时
export function deleteWorkHours(workHoursId) {
  return request({
    url: `/modules/workHours/workhoursfill/${workHoursId}`,
    method: 'delete',
  })
}

// 提交工时
export function commitWorkHours(workHoursId) {
  return request({
    url: '/modules/workHours/workhoursfill/submit/'+workHoursId,
    method: 'put',
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

/**
 * 查询用户填报情况
 * @param startTime
 * @param endTime
 * @returns {AxiosPromise}
 */
export function getFillInfo(startTime,endTime) {
  return request({
    url: `/modules/workHours/workhoursfill/getFillInfo/${startTime}/${endTime}`,
    method: 'get',
  })
}

/**
 * 获取工时详情
 * @param fillId
 * @returns {AxiosPromise}
 */
export function workhoursfillDetail(fillId) {
  return request({
    url: `/modules/workHours/workhoursfill/${fillId}`,
    method: 'get',
  })
}


/**
 * 项目经理工时查询列表
 * @param query
 * @returns {AxiosPromise}
 */
export function workHoursPmlist(query) {
  return request({
    url: '/modules/workHours/workhoursfill/pmlist',
    method: 'get',
    params: query
  })
}



export function exportUsesrFile(query) {
  return request({
    url: '/modules/workHours/workhoursfill/export',
    method: 'get',
    params: query
  })
}

export function exportPmFile(query) {
  return request({
    url: '/modules/workHours/workhoursfill/exportForProject',
    method: 'get',
    params: query
  })
}

export function exportPmUserFile(query) {
  return request({
    url: '/modules/workHours/workhoursfill/exportForUser',
    method: 'get',
    params: query
  })
}
