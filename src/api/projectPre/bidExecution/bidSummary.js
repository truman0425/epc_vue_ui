import request from '@/utils/request'

/**
 *  查询投标总结列表
 */
export function bidDecisionList(query) {
  return request({
    url: '/module/bid/bidSummary/list',
    method: 'get',
    params: query
  })
}
/**
 *  	查询前期项目列表
 */
export function projectList(query) {
  return request({
    url: '/module/bid/bidSummary/projectList',
    method: 'get',
    params: query
  })
}
/**
 * 新增投标总结
 */
export function bidSummaryAdd(query) {
  return request({
    url: '/module/bid/bidSummary',
    method: 'POST',
    data: query
  })
}
/**
 *修改投标总结
 */
export function bidSummaryEdit(query) {
  return request({
    url: '/module/bid/bidSummary',
    method: 'put',
    data: query
  })
}
/**
 * 删除投标总结
 */
export function delBidSummary(bidSummarySid) {
  return request({
    url: `/module/bid/bidSummary/${bidSummarySid}`,
    method: 'delete'
  })
}
/**
 *  查询投标决策详情
 */
export function bidDecisionDetail(bidSummarySid) {
  return request({
    url: `/module/bid/bidSummary/${bidSummarySid}`,
    method: 'get'
  })
}
