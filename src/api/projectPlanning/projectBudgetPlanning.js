import request from '@/utils/request'

/**
 * 查询预算策划列表
 * @param query
 * @returns {AxiosPromise}
 */
export function budgetplanList(query) {
  return request({
    url: '/module/budgetplan/cost/list',
    method: 'get',
    params: query
  })
}
/**
 * 查询行动策划人员列表
 * @param query
 * @returns {AxiosPromise}
 */
export function personnelList(query) {
  return request({
    url: '/module/budgetplan/cost/personnelList',
    method: 'get',
    params: query
  })
}
/**
 * 新增预算策划模板
 * @param data
 * @returns {AxiosPromise}
 */
export function planBudgetTemplateAdd(data) {
  return request({
    url: '/module/plan/planBudgetTemplate',
    method: 'post',
    data: data
  })
}
/**
 * 修改预算策划模板
 * @param data
 * @returns {AxiosPromise}
 */
export function planBudgetTemplateEdit(data) {
  return request({
    url: '/module/plan/planBudgetTemplate',
    method: 'put',
    data: data
  })
}
/**
 *
 * @param query
 * @returns {AxiosPromise}
 */
export function projectList(query) {
  return request({
    url: '/module/budgetplan/cost/projectList',
    method: 'get',
    params: query
  })
}
/**
 * 项目删除
 * @param budgetPlanCostSid
 * @returns {AxiosPromise}
 */
export function delBudgetPlan(budgetPlanCostSid) {
  return request({
    url: `/module/budgetplan/cost/${budgetPlanCostSid}`,
    method: 'delete'
  })
}
//详情
export function getBudgetplanDetail(budgetPlanCostSid) {
  return request({
    url: `/module/budgetplan/cost/${budgetPlanCostSid}`,
    method: 'get',
  })
}
//修改
export function editBudgetplan(query) {
  return request({
    url: '/module/budgetplan/cost',
    method: 'put',
    data: query
  })
}
//新增
export function addBudgetplan(query) {
  return request({
    url: '/module/budgetplan/cost',
    method: 'post',
    data: query
  })
}
//调整
export function adjustment(query) {
  return request({
    url: '/module/budgetplan/cost/adjustment',
    method: 'put',
    data: query
  })
}
