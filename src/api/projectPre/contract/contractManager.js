import request from '@/utils/request'



/**
 * 开票管理列表
 * @param params
 * @returns {AxiosPromise}
 */
export function contractManagerList(params) {
  return request({
    url: `/module/invoicemgt/mgt/list`,
    method: 'get',
    params:params
  })
}

/**
 * 选择进项合同列表
 * @param params
 * @returns {AxiosPromise}
 */
export function incontractSignList(params) {
  return request({
    url: `/module/incontract/sign/all_list`,
    method: 'get',
    params:params
  })
}
/**
 * 开票管理-详情
 * @param tmplId
 * @returns {AxiosPromise}
 */
export function contractManagerDetail(params) {
  return request({
    url: `/module/invoicemgt/mgt/getInfo`,
    method: 'get',
    params:params
  })
}

/**
 * 开票删除
 * @param tmplId
 * @returns {AxiosPromise}
 */
export function invoicemgtDel(tmplId) {
  return request({
    url: `/module/invoicemgt/detail/${tmplId}`,
    method: 'delete'
  })
}



/**
 *  开票信息-详情（审批用）
 * @param tmplId
 * @returns {AxiosPromise}
 */
export function contractManagerApproveDetail(invappId) {
  return request({
    url: `/module/invoicemgt/detail/${invappId}`,
    method: 'get',
  })
}

/**
 * 合同开票新增
 * @param data
 * @returns {AxiosPromise}
 */
export function invoicemgtAdd(data) {
  return request({
    url: '/module/invoicemgt/detail',
    method: 'post',
    data: data
  })
}

/**
 * 合同开票修改
 * @param data
 * @returns {AxiosPromise}
 */
export function invoicemgtEdit(data) {
  return request({
    url: '/module/invoicemgt/detail',
    method: 'put',
    data: data
  })
}

