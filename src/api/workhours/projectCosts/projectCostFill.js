import request from '@/utils/request'


/**
 * 填报列表
 * @param query
 * @returns {AxiosPromise}
 */
export function reportFillList(query) {
  return request({
    url: '/module/artificial/report/list',
    method: 'get',
    params: query
  })
}
/**
 *  填报新增
 */
export function reportFillAdd(data) {
  return request({
    url: '/module/artificial/report',
    method: 'post',
    data: data
  })
}

/**
 * 填报修改
 * @param data
 * @returns {AxiosPromise}
 */
export function reportFillEdit(data) {
  return request({
    url: '/module/artificial/report',
    method: 'put',
    data: data
  })
}


export function reportFillDel(leaderId) {
  return request({
    url: '/module/artificial/report/'+leaderId,
    method: 'delete',
  })
}


/**
 * 项目初始化数据
 * @param query
 * @returns {AxiosPromise}
 */
export function reportFillInitData(query) {
  return request({
    url: '/module/artificial/report/initEpcProjectArtificialReport',
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
 * 填报详情
 * @param leaderId
 * @returns {AxiosPromise}
 */
export function reportFillDetail(reportId) {
  return request({
    url: '/module/artificial/report/'+reportId,
    method: 'get',
  })
}


export function reportViewFillDetail(reportId) {
  return request({
    url: '/module/artificial/report/view/'+reportId,
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

