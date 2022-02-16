import request from '@/utils/request'

/**
 *  	查询线索公海列表
 */
export function clueList(query) {
  return request({
    url: '/module/projectClue/clue/list',
    method: 'get',
    params: query
  })
}
/**
 * 删除线索公海
 */
export function deleteClue(projectClueSid) {
  return request({
    url: '/module/projectClue/' + projectClueSid,
    method: 'delete',
  })
}

export function getClue(projectClueSid) {
  return request({
    url: '/module/projectClue/' + projectClueSid,
    method: 'get',
  })
}
/**
 * 分配用户公海
 */
export function clueAssign(projectClueSids,clueLeaderId) {
  return request({
    url: `/module/projectClue/clueAssign/${projectClueSids}/${clueLeaderId}`,
    method: 'get',
  })
}
/**
 * 修改公海
 */
export function clueEdit(query) {
  return request({
    url: `/module/projectClue/clueEdit`,
    method: 'put',
    data: query
  })
}
/**
 *  	项目线索列表
 */
export function projectCluelists(query) {
  return request({
    url: '/module/projectClue/projectClue/list',
    method: 'get',
    params: query
  })
}
/**
 *  我的线索列表
 */
export function myList(query) {
  return request({
    url: '/module/projectClue/projectClue/myList',
    method: 'get',
    params: query
  })
}
/**
 *  已转机会线索列表
 */
export function chanceList(query) {
  return request({
    url: '/module/projectClue/projectClue/chanceList',
    method: 'get',
    params: query
  })
}
/**
 * 分配用户线索
 */
export function publicClueAssign(projectClueSids,clueLeaderId) {
  return request({
    url: `/module/projectClue/publicClueAssign/${projectClueSids}/${clueLeaderId}`,
    method: 'get',
  })
}
/**
 * 废除线索
 */
export function projectClueAbolish(projectClueSids) {
  return request({
    url: `/module/projectClue/abolish/${projectClueSids}`,
    method: 'get',
  })
}
/**
 * 搁置线索
 */
export function projectClueShelve(projectClueSids) {
  return request({
    url: `/module/projectClue/shelve/${projectClueSids}`,
    method: 'get',
  })
}
/**
 * 新增线索
 */
export function projectClueAdd(query) {
  return request({
    url: '/module/projectClue/projectClueAdd',
    method: 'post',
    data: query
  })
}
/**
 * 新增修改
 */
export function clueProjectEdit(query) {
  return request({
    url: '/module/projectClue/clueProjectEdit',
    method: 'put',
    data: query
  })
}
/**
 *  	查询线索详情
 */
export function projectClueDetail(projectClueSid) {
  return request({
    url: '/module/projectClue/' + projectClueSid,
    method: 'get'
  })
}
/**
 * 线索转机会
 */
export function turnChance(projectClueSids,isSyncCustomerInfo,isSyncContactsInfo,scale,projType,projSource,projKeyPoint) {
  return request({
    url: `/module/projectClue/turnChance/${projectClueSids}/${isSyncCustomerInfo}/${isSyncContactsInfo}/${scale}/${projType}/${projSource}/${projKeyPoint}`,
    method: 'get',
  })
}



/**
 * 项目线索库（线索公海）- 查询线索跟进列表
 */
export function projectClueFuList(params) {
 // projectClueSids = 'b950ffb7dc774712b9f5b118b7f73c06'
  return request({
    url: `/module/projectClueFu/list`,
    method: 'get',
    params:params
  })
}

/**
 * 添加评论
 * @param data
 * @returns {AxiosPromise}
 */
export function projectClueFuComment(data) {
  return request({
    url: '/module/projectClueFuComment',
    method: 'post',
    data: data
  })
}

/**
 * 删除评论
 * @param fuCommentSids
 * @returns {AxiosPromise}
 */
export function deleteComment(fuCommentSids) {
  return request({
    url: `/module/projectClueFuComment/${fuCommentSids}`,
    method: 'DELETE',
  })
}


/**
 * 新增线索跟进
 */
export function projectClueFu(data) {
  return request({
    url: '/module/projectClueFu',
    method: 'post',
    data: data
  })
}

/**
 * 线索跟进查看
 * @param fuSid
 * @returns {AxiosPromise}
 */
export function projectClueFuDetail(fuSid) {
  // projectClueSids = 'b950ffb7dc774712b9f5b118b7f73c06'
  return request({
    url: `/module/projectClueFu/${fuSid}`,
    method: 'get',
  })
}
/**
 *  	查询客户详情（只返回当前线索下的联系人信息）
 */
export function customerDetail(projectClueSid) {
  return request({
    url: `/module/projectClue/customer/${projectClueSid}`,
    method: 'get',
  })
}
/**
 *  	新增跟进-查询联系人列表（只返回当前线索下的联系人信息）
 */
export function projectClueContactsDetail(params) {
  return request({
    url: `/module/projectClueContacts/list/`,
    method: 'get',
    params:params
  })
}
/**
 * 新增客户
 */
export function contactsEdit(query) {
  return request({
    url: '/module/projectClue/contactsEdit',
    method: 'PUT',
    data: query
  })
}
