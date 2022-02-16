import request from '@/utils/request'




/**
 * 所有部门列表
 * @returns {AxiosPromise}
 */
export function depts_all_list(params) {
  return request({
    url: `/system/dept/depts_all_list`,
    method: 'get',
    params:params
  })
}

/**
 * 根据部门名字获取用户
 * @param params
 * @returns {AxiosPromise}
 */
export function getUserForDeptList(params) {
  return request({
    url: `/system/user/getUserForDeptList`,
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


/**
 * 获取项目角色
 * @param params
 * @returns {AxiosPromise}
 */
export function projectRole(params) {
  return request({
    url: `/project/role/list`,
    method: 'get',
    params:params
  })
}





