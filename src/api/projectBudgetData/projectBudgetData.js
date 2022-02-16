import request from '@/utils/request'

/**
 * 项目预算状态变更列表
 * lixm
 * @param query
 * @returns {AxiosPromise}
 */
export function projectbudgetdataList(query) {
  return request({
    url: '/module/project/budgetdata/list',
    method: 'get',
    params: query
  })
}

/**
 * 项目预算状态新增
 * lixm
 * @param query
 * @returns {AxiosPromise}
 */
export function projectbudgetdataAdd(query) {
  return request({
    url: '/module/project/budgetdata',
    method: 'post',
    data: query
  })
}

/**
 * 项目预算状态修改
 * lixm
 * @param query
 * @returns {AxiosPromise}
 */
export function projectbudgetdataEdit(query) {
  return request({
    url: '/module/project/budgetdata',
    method: 'put',
    data: query
  })
}

/**
 * 项目预算状态变更详情
 * lixm
 * @param leaderId
 * @returns {AxiosPromise}
 */
export function projectbudgetdataDetail(leaderId) {
  return request({
    url: '/module/project/budgetdata/'+leaderId,
    method: 'get',
  })
}


export function projectbudgetdataDel(leaderId) {
  return request({
    url: '/module/project/budgetdata/'+leaderId,
    method: 'delete',
  })
}


/**
 *选择项目
 * @param query
 * lixm
 * @returns {AxiosPromise}
 */
export function getProjectForBudgetStatusList(query) {
  return request({
    url: '/module/project/budgetdata/getProjectForBudgetStatusList',
    method: 'get',
    params: query
  })
}

/**
 * 选择项目
 * @param query
 * @returns {AxiosPromise}
 */
export function getProjectList(query) {
  return request({
    url: '/module/project/budgetdata/getProjectForBudgetStatusList',
    method: 'get',
    params: query
  })
}

/**
 * 获取初始化数据
 * @param id
 * @returns {AxiosPromise}
 */
export function initBudgetStatusInfo(id) {
  return request({
    url: '/module/project/budgetdata/initBudgetStatusInfo/'+id,
    method: 'get',
  })
}

