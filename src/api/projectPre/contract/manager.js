import request from '@/utils/request'



/**
 * 合同管理列表
 * @param params
 * @returns {AxiosPromise}
 */
export function contractmgtList(params) {
  return request({
    url: `/module/incontract/contractmgt/list`,
    method: 'get',
    params:params
  })
}



/**
 * 合同管理详情
 * @param tmplId
 * @returns {AxiosPromise}
 */
export function contractmgtDetail(tmplId) {
  return request({
    url: `/module/incontract/contractmgt/${tmplId}`,
    method: 'get',
  })
}


