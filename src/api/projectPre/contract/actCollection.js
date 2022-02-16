import request from '@/utils/request'



/**
 * 实际收款列表
 * @param params
 * @returns {AxiosPromise}
 */
export function invoicemgtList(params) {
  return request({
    url: `/module/invoicemgt/collact/list`,
    method: 'get',
    params:params
  })
}

/**
 * 初始数据（合同评审、进项合同签订）信息
 * @param contrSignId
 * @returns {AxiosPromise}
 */
export function actCollectionDetailInit(contrSignId) {
  return request({
    url: `/module/invoicemgt/collact/init/${contrSignId}`,
    method: 'get',
  })
}


/**
 * 实际收款-详情
 * @param tmplId
 * @returns {AxiosPromise}
 */
export function contractManagerDetail(tmplId) {
  return request({
    url: `/module/invoicemgt/collact/${tmplId}`,
    method: 'get',
  })
}


/**
 * 关联开票信息-列表
 * @param params
 * @returns {AxiosPromise}
 */
export function relation_invoice_list(params) {
  return request({
    url: `/module/invoicemgt/collact/relation_invoice_list`,
    method: 'get',
    params:params
  })
}

/**
 * 关联收款计划-列表
 * @param params
 * @returns {AxiosPromise}
 */
export function relation_contrsigncollplan_list(params) {
  return request({
    url: `/module/invoicemgt/collact/relation_contrsigncollplan_list`,
    method: 'get',
    params:params
  })
}



/**
 * 收款计划新增
 * @param data
 * @returns {AxiosPromise}
 */
export function invoicemgtAdd(data) {
  return request({
    url: '/module/invoicemgt/collact',
    method: 'post',
    data: data
  })
}

/**
 * 收款计划修改
 * @param data
 * @returns {AxiosPromise}
 */
export function invoicemgtEdit(data) {
  return request({
    url: '/module/invoicemgt/collact',
    method: 'put',
    data: data
  })
}

/**
 * 实际收款删除
 * @param tmplId
 * @returns {AxiosPromise}
 */
export function actcollactDel(collactlId) {
  return request({
    url: `/module/invoicemgt/collact/${collactlId}`,
    method: 'delete'
  })
}



