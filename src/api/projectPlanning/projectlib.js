import request from '@/utils/request'

/**
 * 信息变更记录列表
 * @param query
 * @returns {AxiosPromise}
 */
export function infoChangelist(query) {
  return request({
    url: '/module/project/establish/changelist',
    method: 'get',
    params: query
  })
}

/**
 * 主数据同步日志
 * @param query
 * @returns {AxiosPromise}
 */
export function mainsynlist(query) {
  return request({
    url: '/module/project/establish/mainsynlist',
    method: 'get',
    params: query
  })
}

/**
 *  	项目预算变更记录列表
 * @param query
 * @returns {AxiosPromise}
 */
export function budgelist(query) {
  return request({
    url: '/module/project/establish/budgelist',
    method: 'get',
    params: query
  })
}








