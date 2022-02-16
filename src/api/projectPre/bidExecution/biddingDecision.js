import request from '@/utils/request'

/**
 *  	查询投标决策列表
 */
export function biddingDecisionList(query) {
  return request({
    url: '/module/bid/bidDecision/list',
    method: 'get',
    params: query
  })
}
/**
 *  	查询前期项目列表
 */
export function projectList(query) {
  return request({
    url: '/module/bid/bidDecision/projectList',
    method: 'get',
    params: query
  })
}
/**
 * 新增投标决策
 */
export function bidDecisionAdd(query) {
  return request({
    url: '/module/bid/bidDecision',
    method: 'POST',
    data: query
  })
}
/**
 *修改投标决策
 */
export function bidDecisionEdit(query) {
  return request({
    url: '/module/bid/bidDecision',
    method: 'put',
    data: query
  })
}
/**
 * 删除投标决策
 */
export function delBidDecision(bidDecisionSid) {
  return request({
    url: `/module/bid/bidDecision/${bidDecisionSid}`,
    method: 'delete'
  })
}
/**
 * 查询投标决策详情
 */
export function bidDecisionDetail(bidDecisionSid) {
  return request({
    url: `/module/bid/bidDecision/${bidDecisionSid}`,
    method: 'get'
  })
}
