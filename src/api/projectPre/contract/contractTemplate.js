import request from '@/utils/request'



/**
 * 合同模板列表
 * @param params
 * @returns {AxiosPromise}
 */
export function tmplList(params) {
  return request({
    url: `/module/incontract/tmpl/list`,
    method: 'get',
    params:params
  })
}

/**
 * 模板详情
 * @param tmplId
 * @returns {AxiosPromise}
 */
export function tmplDetail(tmplId) {
  return request({
    url: `/module/incontract/tmpl/${tmplId}`,
    method: 'get',
  })
}

/**
 * 合同模板新增
 * @param query
 * @returns {AxiosPromise}
 */
export function tmplAdd(query) {
  return request({
    url: '/module/incontract/tmpl',
    method: 'post',
    data: query
  })
}


/**
 * 合同模板修改
 * @param data
 * @returns {AxiosPromise}
 */
export function tmplEdit(data) {
  return request({
    url: '/module/incontract/tmpl',
    method: 'put',
    data: data
  })
}

/**
 * 合同模板删除
 * @param tmplId
 * @returns {AxiosPromise}
 */
export function tmplDel(tmplId) {
  return request({
    url: `/module/incontract/tmpl/${tmplId}`,
    method: 'delete'
  })
}

/**
 * 合同模板项删除
 * @param tmplId
 * @returns {AxiosPromise}
 */
export function tmplReviewDel(tmplId) {
  return request({
    url: `/module/incontract/review/${tmplId}`,
    method: 'delete'
  })
}
