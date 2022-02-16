import request from '@/utils/request'



/**
 * 进项合同签订列表
 * @param params
 * @returns {AxiosPromise}
 */
export function incontractSignList(params) {
  return request({
    url: `/module/incontract/sign/list`,
    method: 'get',
    params:params
  })
}


/**
 * 进项合同详情
 * @param tmplId
 * @returns {AxiosPromise}
 */
export function incontractSignDetail(tmplId) {
  return request({
    url: `/module/incontract/sign/${tmplId}`,
    method: 'get',
  })
}



/**
 * 合同评审修改
 * @param data
 * @returns {AxiosPromise}
 */
export function incontractSignEdit(data) {
  return request({
    url: '/module/incontract/sign',
    method: 'put',
    data: data
  })
}

