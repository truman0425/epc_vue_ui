import request from '@/utils/request'


/**
 * 月报列表
 * @param query
 * @returns {AxiosPromise}
 */
export function reportList(query) {
  return request({
    url: '/module/epcproject/report/list',
    method: 'get',
    params: query
  })
}
/**
 *  月报新增
 */
export function reportAdd(data) {
  return request({
    url: '/module/epcproject/report',
    method: 'post',
    data: data
  })
}

/**
 * 月报修改
 * @param data
 * @returns {AxiosPromise}
 */
export function reportEdit(data) {
  return request({
    url: '/module/epcproject/report',
    method: 'put',
    data: data
  })
}


export function reportDel(leaderId) {
  return request({
    url: '/module/epcproject/report/'+leaderId,
    method: 'delete',
  })
}


/**
 * 项目初始化数据
 * @param query
 * @returns {AxiosPromise}
 */
export function reportInitData(query) {
  return request({
    url: '/module/epcproject/report/initEpcProjectArtificialMonthReport',
    method: 'get',
    params: query
  })
}

/**
 * 选择项目
 * @param query
 * @returns {AxiosPromise}
 */
export function reportProjectList(query) {
  return request({
    url: '/module/project/establish/projectestablishforartificialreportlist',
    method: 'get',
    params: query
  })
}

// 查询项目进度列表
export function projectScheduleList(query) {
  console.log(query);
  return request({
    url: '/project/schedule/list',
    method: 'get',
    params: query
  })
}

// 根据策划模板id查询阶段列表
export function getStageList(query) {
  return request({
    url: '/project/planning/getStageList',
    method: 'get',
    params: query
  })
}

// 根据策划模板id,阶段查询专业列表
export function getProfessionList(query) {
  return request({
    url: '/project/planning/getProfessionList',
    method: 'get',
    params: query
  })
}

// 查询部门列表
export function getDeptList(query) {
  return request({
    url: '/project/planning/getDeptList',
    method: 'get',
    params: query
  })
}

/**
 * 月报详情
 * @param leaderId
 * @returns {AxiosPromise}
 */
export function reportDetail(reportId) {
  return request({
    url: '/module/epcproject/report/'+reportId,
    method: 'get',
  })
}

/**
 * 审批和查询详情使用
 * @param reportId
 * @returns {AxiosPromise}
 */
export function reportViewDetail(reportId) {
  return request({
    url: '/module/epcproject/report/view/'+reportId,
    method: 'get',
  })
}


//审核记录信息
export function getApprovalRecord(businessType,budgetSid) {
  return request({
    url: '/workflow/getApprovalRecord/'+businessType+'/'+budgetSid+'',
    method: 'get',
    /* data: query*/
  })
}
