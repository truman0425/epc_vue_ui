import request from '@/utils/request'

/**
 *  	查询标书评审列表
 */
export function bidEvaluationList(query) {
  return request({
    url: '/module/bid/bidEvaluation/list',
    method: 'get',
    params: query
  })
}
/**
 *  	查询前期项目列表
 */
export function projectList(query) {
  return request({
    url: '/module/bid/bidEvaluation/projectList',
    method: 'get',
    params: query
  })
}
/**
 *新增标书评审
 */
export function bidEvaluationAdd(query) {
  return request({
    url: '/module/bid/bidEvaluation',
    method: 'POST',
    data: query
  })
}
/**
 *修改标书评审
 */
export function bidEvaluationEdit(query) {
  return request({
    url: '/module/bid/bidEvaluation',
    method: 'put',
    data: query
  })
}
/**
 * 删除标书评审
 */
export function delSchemePrice(bidEvaluationSid) {
  return request({
    url: `/module/bid/bidEvaluation/${bidEvaluationSid}`,
    method: 'delete'
  })
}
/**
 * 查询标书评审详情
 */
export function bidEvaluationDetail(bidEvaluationSid) {
  return request({
    url: `/module/bid/bidEvaluation/${bidEvaluationSid}`,
    method: 'get'
  })
}
