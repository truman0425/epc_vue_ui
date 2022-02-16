import request from '@/utils/request'

/**
 *  	查询方案报价列表
 */
export function schemePriceList(query) {
  return request({
    url: '/module/price/schemePrice/list',
    method: 'get',
    params: query
  })
}
/**
 * 查询前期项目列表
 */
export function projectList(query) {
  return request({
    url: '/module/price/schemePrice/projectList',
    method: 'get',
    params: query
  })
}
//新增
export function addSchemePrice(query) {
  return request({
    url: '/module/price/schemePrice',
    method: 'post',
    data: query
  })
}
//详情
export function getSchemePriceDetail(schemePriceSid) {
  return request({
    url: `/module/price/schemePrice/${schemePriceSid}`,
    method: 'get',
  })
}
//修改
export function editSchemePrice(query) {
  return request({
    url: '/module/price/schemePrice',
    method: 'put',
    data: query
  })
}
//调整
export function adjustment(query) {
  return request({
    url: '/module/price/schemePrice/adjustment',
    method: 'put',
    data: query
  })
}
/**
 * 项目删除
 */
export function delSchemePrice(schemePriceSid) {
  return request({
    url: `/module/price/schemePrice/${schemePriceSid}`,
    method: 'delete'
  })
}
//确认报价
export function confirmQuotation(query) {
  return request({
    url: '/module/price/schemePrice/confirmQuotation',
    method: 'put',
    data: query
  })
}
