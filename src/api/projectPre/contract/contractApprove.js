import request from '@/utils/request'



/**
 * 合同评审列表
 * @param params
 * @returns {AxiosPromise}
 */
export function incontractList(params) {
  return request({
    url: `/module/incontract/contract/list`,
    method: 'get',
    params:params
  })
}


/**
 * 合同评审详情
 * @param tmplId
 * @returns {AxiosPromise}
 */
export function incontractDetail(tmplId) {
  return request({
    url: `/module/incontract/contract/${tmplId}`,
    method: 'get',
  })
}

/**
 * 合同评审新增
 * @param query
 * @returns {AxiosPromise}
 */
export function incontractAdd(query) {
  return request({
    url: '/module/incontract/contract',
    method: 'post',
    data: query
  })
}


/**
 * 合同评审修改
 * @param data
 * @returns {AxiosPromise}
 */
export function incontractEdit(data) {
  return request({
    url: '/module/incontract/contract',
    method: 'put',
    data: data
  })
}



/**
 * 合同评审删除
 * @param tmplId
 * @returns {AxiosPromise}
 */
export function incontractDel(tmplId) {
  return request({
    url: `/module/incontract/contract/${tmplId}`,
    method: 'delete'
  })
}


/**
 * 前期项目列表
 * @param params
 * @returns {AxiosPromise}
 */
export function incontractProjectList(params) {
  return request({
    url: `/module/projlib/library/proj_incontract_contract_list`,
    method: 'get',
    params:params
  })
}

/**
 * 评审模板
 * @param params
 * @returns {AxiosPromise}
 */
export function tmplAllList(params) {
  return request({
    url: `/module/incontract/tmpl/all_list`,
    method: 'get',
    params:params
  })
}
