import request from '@/utils/request'
/*
*查询预算策划模板列表
* */
export function planBudgetTemplateList(query) {
  return request({
    url: '/module/plan/planBudgetTemplate/list',
    method: 'get',
    params: query
  })
}
/*
  * 删除预算策划模板
  */
export function deletePlanBudget(budgetTemplateSid) {
  return request({
    url: '/module/plan/planBudgetTemplate/' + budgetTemplateSid,
    method: 'delete',
  })
}
/*
 * 预算策划模板新增
 */
export function planBudgetTemplateAdd(query) {
  return request({
    url: '/module/plan/planBudgetTemplate',
    method: 'post',
    data: query
  })
}
/*
 * 预算策划模板修改
 */
export function planBudgetTemplateRevise(query) {
  return request({
    url: '/module/plan/planBudgetTemplate',
    method: 'put',
    data: query
  })
}
/*
*预算策划模板详情
* */
export function planBudgetTemplateDetail(budgetTemplateSid) {
  return request({
    url: '/module/plan/planBudgetTemplate/' + budgetTemplateSid,
    method: 'get'
  })
}

/*
询策略策划模板列表
* */
export function strategyTemplateList(query) {
  return request({
    url: '/module/plan/strategyTemplate/list',
    method: 'get',
    params: query
  })
}
/*
* 查询策略策划模板详情
* */
export function strategyTemplateDetail(strategyTemplateSid) {
  return request({
    url: '/module/plan/strategyTemplate/' + strategyTemplateSid,
    method: 'get'
  })
}

/*
* 查询行动策划模板列表
* */
export function actionTemplateList(query) {
  return request({
    url: '/module/plan/actionTemplate/list',
    method: 'get',
    params: query
  })
}
/*
* 查询行动策划模板详情
* */
export function actionTemplateDetail(actionTemplateSid) {
  return request({
    url: '/module/plan/actionTemplate/' + actionTemplateSid,
    method: 'get'
  })
}
/*
 * 行动策划模板新增
 */
export function actionTemplateAdd(query) {
  return request({
    url: '/module/plan/actionTemplate',
    method: 'post',
    data: query
  })
}
/*
 * 行动策划模板修改
 */
export function actionTemplateRevise(query) {
  return request({
    url: '/module/plan/actionTemplate',
    method: 'put',
    data: query
  })
}
/*
  * 删除行动策划模板
  */
export function deleteAction(actionTemplateSid) {
  return request({
    url: '/module/plan/actionTemplate/' + actionTemplateSid,
    method: 'delete',
  })
}
