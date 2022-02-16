import request from '@/utils/request'
/**
 *  	查询企业资质列表
 */
export function qualificationList(query) {
  return request({
    url: '/module/enterprise/qualification/list',
    method: 'get',
    params: query
  })
}
/**
 * 删除
 */
export function delSchemePrice(enterpriseQualificationSid) {
  return request({
    url: `/module/enterprise/qualification/${enterpriseQualificationSid}`,
    method: 'delete'
  })
}
//新增
export function addQualification(query) {
  return request({
    url: '/module/enterprise/qualification',
    method: 'post',
    data: query
  })
}
//详情
export function qualificationDetail(enterpriseQualificationSid) {
  return request({
    url: `/module/enterprise/qualification/${enterpriseQualificationSid}`,
    method: 'get',
  })
}
//修改
export function editQualification(query) {
  return request({
    url: '/module/enterprise/qualification',
    method: 'put',
    data: query
  })
}
