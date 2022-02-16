import request from '@/utils/request'



/**
 *  我的任务
 * @returns {AxiosPromise}
 */
export function indexTaskStatistics() {
  return request({
    url: `/module/index/task/statistics`,
    method: 'get',
  })
}

/**
 * 我的任务列表
 * @returns {AxiosPromise}
 */
export function indexTaskList(params) {
  return request({
    url: `/module/index/task/my_task_list`,
    method: 'get',
    params:params
  })
}

/**
 * 我负责的线索
 * @param params
 * @returns {AxiosPromise}
 */
export function clueMyList(params) {
  return request({
    url: `/module/index/clue/myList`,
    method: 'get',
    params:params
  })
}

/**
 * 查询前期项目列表（我负责的或我参与的）
 * @param params
 * @returns {AxiosPromise}
 */
export function libraryList(params) {
  return request({
    url: `/module/index/library/list`,
    method: 'get',
    params:params
  })
}


/**
 * 控单前五
 * @param params
 * @returns {AxiosPromise}
 */
export function top5List() {
  return request({
    url: `/module/index/stanls/list`,
    method: 'get',
  })
}


/**
 * 首页我的机会列表
 * @param params
 * @returns {AxiosPromise}
 */
export function myChanceList(params) {
  return request({
    url: `/module/projchance/chance/list`,
    method: 'get',
    params:params
  })
}






