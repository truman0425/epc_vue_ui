import request from '@/utils/request'

/**
 * WIN（决胜操纵）1 核心决策者选定我们，或主动协助我们策划、实施项目获取过程 接口
 * @param query
 * @returns {AxiosPromise}
 */
export function winOneList(query) {
  return request({
    url: '/module/stanls/report/winOneList',
    method: 'get',
    params: query
  })
}

/**
 *  FIRST （趋赢标杆）1 决策者及决策结构中关键人均认可我们 接口
 * @param query
 * @returns {AxiosPromise}
 */
export function firstOneList(query) {
  return request({
    url: '/module/stanls/report/firstOneList',
    method: 'get',
    params: query
  })
}

/**
 * FIRST （趋赢标杆）2 决策结构中的关键人主动协助我们策划、实施项目获取过程 接口
 * @param query
 * @returns {AxiosPromise}
 */
export function firstTwoList(query) {
  return request({
    url: '/module/stanls/report/firstTwoList',
    method: 'get',
    params: query
  })
}

/**
 * 3 决策结构中的多数人认可我们 接口
 * @param query
 * @returns {AxiosPromise}
 */
export function firstThreeList(query) {
  return request({
    url: '/module/stanls/report/firstThreeList',
    method: 'get',
    params: query
  })
}

/**
 *  CLEAR（资源地图） 2 客户的采购流程和关键节点（同类项目、本项目） 接口
 * @param query
 * @returns {AxiosPromise}
 */
export function clearTwoList(query) {
  return request({
    url: '/module/stanls/report/clearTwoList',
    method: 'get',
    params: query
  })
}

/**
 * CLEAR（资源地图） 3 客户的组织结构，主要成员共鸣点 接口
 * @param query
 * @returns {AxiosPromise}
 */
export function clearThreeList(query) {
  return request({
    url: '/module/stanls/report/clearThreeList',
    method: 'get',
    params: query
  })
}

/**
 * CLEAR（资源地图） 4 客户关于此项目的决策结构及各人的影响力／定位/倾向 接口
 * @param query
 * @returns {AxiosPromise}
 */
export function clearFourList(query) {
  return request({
    url: '/module/stanls/report/clearFourList',
    method: 'get',
    params: query
  })
}

/**
 *  CLEAR（资源地图） 5 立项原因及决策结构中每个人的决策点，关键决策点 接口
 * @param query
 * @returns {AxiosPromise}
 */
export function clearFiveList(query) {
  return request({
    url: '/module/stanls/report/clearFiveList',
    method: 'get',
    params: query
  })
}

/**
 * CLEAR（资源地图） 6 客户付款信誉／付款习惯，项目资金来源及到位情况 接口
 * @param query
 * @returns {AxiosPromise}
 */
export function clearSixList(query) {
  return request({
    url: '/module/stanls/report/clearSixList',
    method: 'get',
    params: query
  })
}

/**
 * CLEAR（资源地图） 7 参与者在项目推进过程中可利用的资源及作用 接口
 * @param query
 * @returns {AxiosPromise}
 */
export function clearSevenList(query) {
  return request({
    url: '/module/stanls/report/clearSevenList',
    method: 'get',
    params: query
  })
}

/**
 * CLEAR（资源地图） 8 各参与者的推进活动/swot,客户认为的各参与者的SWOT 接口
 * @param query
 * @returns {AxiosPromise}
 */
export function clearEightList(query) {
  return request({
    url: '/module/stanls/report/clearEightList',
    method: 'get',
    params: query
  })
}

/**
 * CLEAR（资源地图） 9 关键成功因素（KSF3，以及其中最重要的三个因素）(TOP3的变化情况） 接口
 * @param query
 * @returns {AxiosPromise}
 */
export function clearNineList(query) {
  return request({
    url: '/module/stanls/report/clearNineList',
    method: 'get',
    params: query
  })
}

/**
 * 策略策划报告详情
 * @param projectId
 * @returns {AxiosPromise}
 */
export function actionReportDetail(projectId) {
  return request({
    url: `/module/stanls/report/${projectId}`,
    method: 'get',
  })
}

/**
 * 策略策划报告
 * @param query
 * @returns {AxiosPromise}
 */
export function actionReportConfirm(query) {
  return request({
    url: '/module/stanls/report/confirm',
    method: 'post',
    data: query
  })
}

/**
 * 评论列表
 * @param query
 * @returns {AxiosPromise}
 */
export function reportCommitList(query) {
  return request({
    url: '/module/stanls/comment/list',
    method: 'get',
    params: query
  })
}

/**
 * 添加评论
 * @param query
 * @returns {AxiosPromise}
 */
export function reportCommitAdd(query) {
  return request({
    url: '/module/stanls/comment',
    method: 'post',
    data: query
  })
}

/**
 * 评论回复
 * @param query
 * @returns {AxiosPromise}
 */
export function reportCommentReply(query) {
  return request({
    url: '/module/stanls/commentReply',
    method: 'post',
    data: query
  })
}

/**
 * 删除评论回复
 * @param projIds
 * @returns {AxiosPromise}
 */
export function delCommentReply(projIds) {
  return request({
    url: `/module/stanls/commentReply/${projIds}`,
    method: 'delete'
  })
}

/**
 * 删除评论
 * @param projIds
 * @returns {AxiosPromise}
 */
export function delComment(projIds) {
  return request({
    url: `/module/stanls/comment/${projIds}`,
    method: 'delete'
  })
}
