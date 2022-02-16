import request from '@/utils/request'

/**
 * 预算列表
 * @param query
 * @returns {AxiosPromise}
 */
export function budgetList(query) {
  return request({
    url: '/module/budgetformulate/list',
    method: 'get',
    params: query
  })
}

/**
 * 选择项目
 * @param query
 * @returns {AxiosPromise} module/budgetformulate/getProjectList
 */
export function budgetSelectProjectList(query) {
  return request({
    url: '/module/budgetformulate/getProjectList',
    method: 'get',
    params: query
  })
}

/**
 * 获取初始化数据
 * @param projectPlanningSid
 * @returns {AxiosPromise}
 */
export function getInitEpcBudgetFormulate(query) {
  return request({
    url: '/module/budgetformulate/initEpcBudgetFormulate',
    method: 'get',
    params: query
  })
}

/**
 * 选择科目
 * @param projectPlanningSid
 * @returns {AxiosPromise}
 */
export function getSelectSubjectListByTemplateSid(templateSid) {
  return request({
    url: '/module/budget/subjectTemplate/getSelectSubjectListByTemplateSid/' + templateSid,
    method: 'get'
  })
}


/**
 * 添加预算新增
 * @param data
 * @returns {AxiosPromise}
 */
export function addBudget(data) {
  return request({
    url: '/module/budgetformulate',
    method: 'post',
    data: data
  })
}


/**
 * 修改预算
 * @param data
 * @returns {AxiosPromise}
 */
export function updateBudget(data) {
  return request({
    url: '/module/budgetformulate',
    method: 'put',
    data: data
  })
}

/**
 * 预算删除
 * @param projectPlanningSid
 * @returns {AxiosPromise}
 */
export function delBudget(projectPlanningSid) {
  return request({
    url: '/module/budgetformulate/' + projectPlanningSid,
    method: 'delete'
  })
}


/**
 * 预算详情
 * @param budgetId
 * @returns {AxiosPromise}
 */
export function budgetDetail(query) {
  return request({
    url: '/module/budgetformulate/getInfo',
    method: 'get',
    params:query
  })
}


/**
 * 选择专业所
 * @param budgetId
 * @returns {AxiosPromise}
 */
export function selectMajorsList(budgetId) {
  return request({
    url: '/system/dept/selectMajors/' + budgetId,
    method: 'get'
  })
}


/**
 * 调整记录列表
 * @param query
 * @returns {AxiosPromise}
 */
export function recordList(query) {
  return request({
    url: '/module/budget/adjust/list',
    method: 'get',
    params: query
  })
}

/**
 * 预算调整记录列表
 * @param query
 * @returns {AxiosPromise}
 */
export function budgetRecordList(query) {
  return request({
    url: '/module/budgetadjust/list',
    method: 'get',
    params: query
  })
}





/**
 * 调整记录详情
 * @param budgetId
 * @returns {AxiosPromise}
 */
export function recordDetail(budgetId) {
  return request({
    url: '/module/budgetadjust/' + budgetId,
    method: 'get'
  })
}

/**
 * 发送xmp
 * @param budgetId
 * @returns {AxiosPromise}
 */
export function sendXPM(budgetId) {
  return request({
    url: '/module/budgetformulate/sendXPM/' + budgetId,
    method: 'get'
  })
}

