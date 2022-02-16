import request from '@/utils/request'
/*
* 查询客户组织结构列表（树形结构）
* */
export function analysisCusTree(query) {
  return request({
    url: '/module/stanls/stanlsCustOrg/treeselect',
    method: 'get',
    params: query
  })
}

/**
 * 新增客户组织结构
 * @param query
 * @returns {AxiosPromise}
 */
export function analysisCusTreeAdd(query) {
  return request({
    url: '/module/stanls/stanlsCustOrg',
    method: 'post',
    data: query
  })
}

/**
 * 删除客户组织结构
 * @param actionId
 * @returns {AxiosPromise}
 */
export function analysisCusTreeDel(actionId) {
  return request({
    url: '/module/stanls/stanlsCustOrg/' + actionId,
    method: 'delete',
  })
}

/**
 * 客户组织结构修改
 * @param query
 * @returns {AxiosPromise}
 */
export function analysisCusTreeEdit(query) {
  return request({
    url: '/module/stanls/stanlsCustOrg',
    method: 'put',
    data: query
  })
}

/**
 * 查询客户组织结构详情
 * @param custOrgSid
 * @returns {AxiosPromise}
 */
export function analysisCusTreeDetail(custOrgSid) {
  return request({
    url: `/module/stanls/stanlsCustOrg/${custOrgSid}`,
    method: 'get',
  })
}

/**
 * 客户共鸣点列表
 * @param query
 * @returns {AxiosPromise}
 */
export function cusPointList(query) {
  return request({
    url: '/module/stanls/stanlsCustResonancePoint/list',
    method: 'get',
    params: query
  })
}
/**
 * 新增客户共鸣点
 * @param query
 * @returns {AxiosPromise}
 */
export function cusPointAdd(query) {
  return request({
    url: '/module/stanls/stanlsCustResonancePoint',
    method: 'post',
    data: query
  })
}

/**
 * 客户共鸣点删除
 * @param actionId
 * @returns {AxiosPromise}
 */
export function cusPointDel(actionId) {
  return request({
    url: '/module/stanls/stanlsCustResonancePoint/' + actionId,
    method: 'delete',
  })
}

/**
 * 客户共鸣点修改
 * @param query
 * @returns {AxiosPromise}
 */
export function cusPointEdit(query) {
  return request({
    url: '/module/stanls/stanlsCustResonancePoint',
    method: 'put',
    data: query
  })
}

/**
 * 新增客户资金情况
 * @param query
 * @returns {AxiosPromise}
 */
export function cusMoneyAdd(query) {
  return request({
    url: '/module/stanls/stanlsCustFundSituation',
    method: 'post',
    data: query
  })
}

/**
 * 修改客户资金情况
 * @param query
 * @returns {AxiosPromise}
 */
export function cusMoneyEdit(query) {
  return request({
    url: '/module/stanls/stanlsCustFundSituation',
    method: 'put',
    data: query
  })
}

/**
 * 查存客户资金情况
 * @param custOrgSid
 * @returns {AxiosPromise}
 */
export function cusMoneyDetail(custOrgSid) {
  return request({
    url: `/module/stanls/stanlsCustFundSituation/${custOrgSid}`,
    method: 'get',
  })
}


//

/**
 * 客户决策列表
 * @param query
 * @returns {AxiosPromise}
 */
export function cusStructureList(query) {
  return request({
    url: '/module/stanls/custDecisionStructure/list',
    method: 'get',
    params: query
  })
}

/**
 * 客户决策结构新增
 * @param query
 * @returns {AxiosPromise}
 */
export function cusStructureAdd(query) {
  return request({
    url: '/module/stanls/custDecisionStructure',
    method: 'post',
    data: query
  })
}
/**
 * 客户决策结构修改
 * @param query
 * @returns {AxiosPromise}
 */
export function cusStructureEdit(query) {
  return request({
    url: '/module/stanls/custDecisionStructure',
    method: 'put',
    data: query
  })
}

/**
 * 客户决策结构删除
 * @param actionId
 * @returns {AxiosPromise}
 */
export function cusStructureDel(actionId) {
  return request({
    url: '/module/stanls/custDecisionStructure/' + actionId,
    method: 'delete',
  })
}

/**
 * 立项原因新增
 * @param query
 * @returns {AxiosPromise}
 */
export function reasonAdd(query) {
  return request({
    url: '/module/stanls/custProjectReason',
    method: 'post',
    data: query
  })
}

/**
 * 立项原因修改
 * @param query
 * @returns {AxiosPromise}
 */
export function reasonEdit(query) {
  return request({
    url: '/module/stanls/custProjectReason',
    method: 'put',
    data: query
  })
}

/**
 * 立项原因查看
 * @param query
 * @returns {AxiosPromise}
 */
export function reasonDetail(id) {
  return request({
    url: `/module/stanls/custProjectReason/${id}`,
    method: 'get',
  })
}

/**
 * 项目协助列表
 * @param query
 * @returns {AxiosPromise}
 */
export function projectHelpList(query) {
  return request({
    url: '/module/stanls/custProjectAssistProcess/list',
    method: 'get',
    params: query
  })
}

/**
 * 项目协助新增
 * @param query
 * @returns {AxiosPromise}
 */
export function projectHelpUserAdd(query) {
  return request({
    url: '/module/stanls/custProjectAssistProcess',
    method: 'post',
    data: query
  })
}

/**
 * 添加协助过程
 * @param query
 * @returns {AxiosPromise}
 */
export function projectHelpDetailAdd(query) {
  return request({
    url: '/module/stanls/custProjectAssistProcessDetail',
    method: 'post',
    data: query
  })
}

/**
 * 修改协助过程
 * @param query
 * @returns {AxiosPromise}
 */
export function projectHelpDetailEdit(query) {
  return request({
    url: '/module/stanls/custProjectAssistProcessDetail',
    method: 'put',
    data: query
  })
}

/**
 * 删除协助过程
 * @param actionId
 * @returns {AxiosPromise}
 */
export function projectHelpDetailDel(actionId) {
  return request({
    url: '/module/stanls/custProjectAssistProcessDetail/' + actionId,
    method: 'delete',
  })
}



/**
 * 决策流程 采购流程 列表
 * @param query
 * @returns {AxiosPromise}
 */
export function decisionPurchaseList(query) {
  return request({
    url: '/module/stanls/decisionPurchaseProcess/list',
    method: 'get',
    params: query
  })
}

/**
 * 新增采购流程
 * @param query
 * @returns {AxiosPromise}
 */
export function decisionPurchaseAdd(query) {
  return request({
    url: '/module/stanls/decisionPurchaseProcess',
    method: 'post',
    data: query
  })
}

/**
 * 删除采购流程
 * @param actionId
 * @returns {AxiosPromise}
 */
export function decisionPurchaseDel(actionId) {
  return request({
    url: '/module/stanls/decisionPurchaseProcess/' + actionId,
    method: 'delete',
  })
}

/**
 * 修改采购流程
 * @param query
 * @returns {AxiosPromise}
 */
export function decisionPurchaseEdit(query) {
  return request({
    url: '/module/stanls/decisionPurchaseProcess',
    method: 'put',
    data: query
  })
}

/**
 * 个 查询参与方列表（包含明细）
 * @param query
 * @returns {AxiosPromise}
 */
export function participantsList(query) {
  return request({
    url: '/module/stanls/cmperParticipantsResources/list',
    method: 'get',
    params: query
  })
}

/**
 * 新增参与方
 * @param query
 * @returns {AxiosPromise}
 */
export function participantsAdd(query) {
  return request({
    url: '/module/stanls/cmperParticipantsResources',
    method: 'post',
    data: query
  })
}

/**
 * 查询各参与方可利用资源及作用明细列表
 * @param query
 * @returns {AxiosPromise}
 */
export function participantsDetailList(query) {
  return request({
    url: '/module/stanls/cmperParticipantsResourcesDetail',
    method: 'get',
    params: query
  })
}

/**
 * 新增各参与方可利用资源及作用明细
 * @param query
 * @returns {AxiosPromise}
 */
export function participantsDetailAdd(query) {
  return request({
    url: '/module/stanls/cmperParticipantsResourcesDetail',
    method: 'post',
    data: query
  })
}

/**
 *  删除各参与方可利用资源及作用明细
 * @param actionId
 * @returns {AxiosPromise}
 */
export function participantsDetailDel(actionId) {
  return request({
    url: '/module/stanls/cmperParticipantsResourcesDetail/' + actionId,
    method: 'delete',
  })
}

/**
 *  修改各参与方可利用资源及作用明细
 * @param query
 * @returns {AxiosPromise}
 */
export function participantsDetailEdit(query) {
  return request({
    url: '/module/stanls/cmperParticipantsResourcesDetail',
    method: 'put',
    data: query
  })
}


/**
 * 各参与方SWOT分析
 * @param query
 * @returns {AxiosPromise}
 */
export function swotList(query) {
  return request({
    url: '/module/stanls/custParticipantsSwot/list',
    method: 'get',
    params: query
  })
}

/**
 * 新增参与方
 * @param query
 * @returns {AxiosPromise}
 */
export function swotAdd(query) {
  return request({
    url: '/module/stanls/custParticipantsSwot',
    method: 'post',
    data: query
  })
}

/**
 *  查询SWOT分析列表
 * @param query
 * @returns {AxiosPromise}
 */
export function swotDetailList(query) {
  return request({
    url: '/module/stanls/custParticipantsSwotDetail/list',
    method: 'get',
    params: query
  })
}

/**
 * 新增SWOT分析
 * @param query
 * @returns {AxiosPromise}
 */
export function swotDetailAdd(query) {
  return request({
    url: '/module/stanls/custParticipantsSwotDetail',
    method: 'post',
    data: query
  })
}

/**
 * 删除SWOT分析
 * @param actionId
 * @returns {AxiosPromise}
 */
export function swotDetailDel(actionId) {
  return request({
    url: '/module/stanls/custParticipantsSwotDetail/' + actionId,
    method: 'delete',
  })
}

/**
 * 修改SWOT分析
 * @param query
 * @returns {AxiosPromise}
 */
export function swotDetailEdit(query) {
  return request({
    url: '/module/stanls/custParticipantsSwotDetail',
    method: 'put',
    data: query
  })
}

/**
 * 查询SWOT分析列表 客户认为的
 * @param query
 * @returns {AxiosPromise}
 */
export function swotCusList(query) {
  return request({
    url: '/module/stanls/cmperCustParticipantsSwot/list',
    method: 'get',
    params: query
  })
}

/**
 * 新增SWOT分析
 * @param query
 * @returns {AxiosPromise}
 */
export function swotCusAdd(query) {
  return request({
    url: '/module/stanls/cmperCustParticipantsSwot',
    method: 'post',
    data: query
  })
}

/**
 *  删除SWOT分析
 * @param actionId
 * @returns {AxiosPromise}
 */
export function swotCusDel(actionId) {
  return request({
    url: '/module/stanls/cmperCustParticipantsSwot/' + actionId,
    method: 'delete',
  })
}

/**
 * 修改客户认为的swot
 * @param query
 * @returns {AxiosPromise}
 */
export function swotCusEdit(query) {
  return request({
    url: '/module/stanls/cmperCustParticipantsSwot',
    method: 'put',
    data: query
  })
}

/**
 * 查询关键成功因素列表
 * @param query
 * @returns {AxiosPromise}
 */
export function successPointList(query) {
  return request({
    url: '/module/stanls/custKeySuccessFactors/list',
    method: 'get',
    params: query
  })
}

/**
 * 新增关键成功因素
 * @param query
 * @returns {AxiosPromise}
 */
export function successPointAdd(query) {
  return request({
    url: '/module/stanls/custKeySuccessFactors',
    method: 'post',
    data: query
  })
}

/**
 *  删除关键成功因素
 * @param actionId
 * @returns {AxiosPromise}
 */
export function successPointDel(actionId) {
  return request({
    url: '/module/stanls/custKeySuccessFactors/' + actionId,
    method: 'delete',
  })
}

/**
 * 修改关键成功因素
 * @param query
 * @returns {AxiosPromise}
 */
export function successPointEdit(query) {
  return request({
    url: '/module/stanls/custKeySuccessFactors',
    method: 'put',
    data: query
  })
}

/**
 * 任务列表
 * @param taskId
 * @returns {AxiosPromise}
 */
export function taskByProjectIdList(taskId) {
  return request({
    url: `/module/stanls/custKeySuccessFactors/taskList/${taskId}`,
    method: 'get',
  })
}

/**
 * 概况接口
 * @param taskId
 * @returns {AxiosPromise}
 */
export function surveyDetail() {
  return request({
    url: `/module/stanls/report/survey`,
    method: 'get',
  })
}

/**
 * 查询项目策略分析列表（已进行策略分析和未进行策略分析的前期项目库列表）
 * @param query
 * @returns {AxiosPromise}
 */
export function analysisList(query) {
  return request({
    url: '/module/stanls/report/projectList',
    method: 'get',
    params: query
  })
}

/**
 * 查询前期项目详情
 * @param projectId
 * @returns {AxiosPromise}
 */
export function analysisProjectInfo(projectId) {
  return request({
    url:`/module/stanls/report/projectInfo/${projectId}`,
    method: 'get',
  })
}

