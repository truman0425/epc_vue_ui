import request from '@/utils/request'

/**
 *  	查询客户列表
 */
export function customerList(query) {
  return request({
    url: '/module/customer/list',
    method: 'get',
    params: query
  })
}
/**
 * 删除客户
 */
export function deleteCustomer(customerSid) {
  return request({
    url: '/module/customer/' + customerSid,
    method: 'delete',
  })
}
/**
 * 新增客户
 */
export function customerRevise(query) {
  return request({
    url: '/module/customer',
    method: 'PUT',
    data: query
  })
}

/**
 * 修改客户联系人
 * @param query
 * @returns {AxiosPromise}
 */
export function contactsEdit(query) {
  return request({
    url: '/module/customer/contactsEdit',
    method: 'PUT',
    data: query
  })
}


/**
 * 修改客户
 */
export function customerAdd(query) {
  return request({
    url: '/module/customer',
    method: 'post',
    data: query
  })
}
/**
 *  	查询客户详情
 */
export function customerDetail(customerSid) {
  let url = window.location.href;
  if(url.indexOf('chanceSharDetail') != -1){
    return request({
      url: `/anonymous/customer/${customerSid}`,
      method: 'get',
    })
  }else{
    return request({
      url: '/module/customer/' + customerSid,
      method: 'get'
    })
  }

}
/**
 *  导出客户
 */
export function exportCustomer(query) {
  return request({
    url: '/module/customer/export',
    method: 'get',
    params: query
  })
}
/**
 *  	查询客户联系人列表
 */
export function contactsList(query) {
  return request({
    url: '/module/contacts/list',
    method: 'get',
    params: query
  })
}
/**
 * 客户名字查重
 */
export function checkCustomerNameUnique(customerName) {
  return request({
    url: '/module/customer/checkCustomerNameUnique',
    method: 'post',
    params: customerName
  })
}

/**
 * 用户组织架构
 * @param customerSid
 * @returns {AxiosPromise}
 */
export function customerOrgList(customerSid) {
  return request({
    url: '/module/organization/' + customerSid,
    method: 'get'
  })

}
/**
 *  	查询客户项目立项列表
 */
export function libraryList(query) {
  return request({
    url: '/module/projlib/library/custList',
    method: 'get',
    params: query
  })
}
/**
 *  	查询客户合同列表
 */
export function incontractList(query) {
  return request({
    url: '/module/incontract/sign/custList',
    method: 'get',
    params: query
  })
}
