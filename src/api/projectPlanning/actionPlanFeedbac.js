import request from '@/utils/request'

/**
 * 前期项目行动策划反馈主信息
 * @param query
 * @returns {AxiosPromise}
 */
export function feedbackInfo(planActId) {
  return request({
    url: '/module/projplanact/action/feedback/' + planActId,
    method: 'get',
  })
}
/**
 * 前期项目行动策划-任务列表
 * @param query
 * @returns {AxiosPromise}
 */
export function my_task_list(query) {
  return request({
    url: '/module/projplanact/task/my_task_list',
    method: 'get',
    params: query
  })
}
/**
 * 前期项目行动策划-任务列表（树形）
 * @param query
 * @returns {AxiosPromise}
 */
export function plan_act_task_list(planActId) {
  return request({
    url: `/module/projplanact/task/plan_act_task_list?planActId=${planActId}`,
    method: 'get',
  })
}
/**
 * 前期项目行动策划-任务详情
 * @param query
 * @returns {AxiosPromise}
 */
export function myTaskListDetail(taskId) {
  return request({
    url: `/module/projplanact/task/my_task_info/${taskId}`,
    method: 'get',
  })
}
/**
 *  	项目预算变更记录列表
 * @param query
 * @returns {AxiosPromise}
 */
export function myList(query) {
  return request({
    url: '/module/projplanact/action/my_list',
    method: 'get',
    params: query
  })
}
/**
 *  	任务反馈（任务状态调整）
 * @param query
 * @returns {AxiosPromise}
 */
export function feedback(query) {
  return request({
    url: '/module/projplanact/task/feedback/taskStatus',
    method: 'post',
    data: query
  })
}
/**
 *  	任务反馈（反馈记录）
 * @param query
 * @returns {AxiosPromise}
 */
export function fdbkContent(query) {
  return request({
    url: '/module/projplanact/task/feedback/fdbkcontent',
    method: 'post',
    data: query
  })
}
/**
 *  	任务反馈（附件上传）
 * @param query
 * @returns {AxiosPromise}
 */
export function fdbkFile(query) {
  return request({
    url: '/module/projplanact/task/feedback/file',
    method: 'post',
    data: query
  })
}

/**
 * 附件删除
 * @param attsid
 * @returns {AxiosPromise}
 */
export function delFile(attsid) {
  return request({
    url: `/fileservice/operating/delete/${attsid}`,
    method: 'post',
  })
}
