import request from '@/utils/request'

/**
 * 项目负责人变更列表
 * @param query
 * @returns {AxiosPromise}
 */
export function projectleaderList(query) {
  return request({
    url: '/module/project/projectleader/list',
    method: 'get',
    params: query
  })
}

/**
 * 项目负责人变更详情
 * @param leaderId
 * @returns {AxiosPromise}
 */
export function projectleaderDetail(leaderId) {
  return request({
    url: '/module/project/projectleader/'+leaderId,
    method: 'get',
  })
}

/**
 * 项目负责人新增
 * @param query
 * @returns {AxiosPromise}
 */
export function projectleaderAdd(query) {
  return request({
    url: '/module/project/projectleader',
    method: 'post',
    data: query
  })
}

/**
 * 项目负责人修改
 * @param query
 * @returns {AxiosPromise}
 */
export function projectleaderEdit(query) {
  return request({
    url: '/module/project/projectleader',
    method: 'put',
    data: query
  })
}

export function projectleaderDel(leaderId) {
  return request({
    url: '/module/project/projectleader/'+leaderId,
    method: 'delete',
  })
}


/**
 * 5.24	项目负责人变更验证是否允许变更
 * @param query
 * @returns {AxiosPromise}
 */
export function verificationEpcProjectChangeLeader(query) {
  return request({
    url: '/module/project/projectleader/verificationEpcProjectChangeLeader',
    method: 'get',
    params: query
  })
}
