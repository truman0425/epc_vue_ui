import request from '@/utils/request'

/**
 * 项目状态变更列表
 * @param query
 * @returns {AxiosPromise}
 */
export function projectstatusList(query) {
  return request({
    url: '/module/project/projectstatus/list',
    method: 'get',
    params: query
  })
}

/**
 * 项目状态变更详情
 * @param leaderId
 * @returns {AxiosPromise}
 */
export function projectstatusDetail(leaderId) {
  return request({
    url: '/module/project/projectstatus/'+leaderId,
    method: 'get',
  })
}

/**
 * 项目状态新增
 * @param query
 * @returns {AxiosPromise}
 */
export function projectstatusAdd(query) {
  return request({
    url: '/module/project/projectstatus',
    method: 'post',
    data: query
  })
}

/**
 * 项目状态修改
 * @param query
 * @returns {AxiosPromise}
 */
export function projectstatusEdit(query) {
  return request({
    url: '/module/project/projectstatus',
    method: 'put',
    data: query
  })
}

export function projectstatusDel(leaderId) {
  return request({
    url: '/module/project/projectstatus/'+leaderId,
    method: 'delete',
  })
}


/**
 * 5.30	项目状态变更验证是否允许变更
 * @param query
 * @returns {AxiosPromise}
 */
export function verificationEpcProjectChangeStatus(query) {
  return request({
    url: '/module/project/projectstatus/verificationEpcProjectChangeStatus',
    method: 'get',
    params: query
  })
}
