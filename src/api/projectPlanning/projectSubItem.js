import request from '@/utils/request'


/**
 * 选择项目
 * @param query
 * @returns {AxiosPromise}
 */
export function getProjectItemPop(query) {
  return request({
    url: '/module/project/establish/getProjectItemPop',
    method: 'get',
    params: query
  })
}

/**
 * 项目分项新增初始化数据
 * @param query
 * @returns {AxiosPromise}  projectInitialId 新增  projectSubId 修改
 */
export function initEpcProjectSub(query) {
  return request({
    url: '/module/projectsub/projectsub/initEpcProjectSub',
    method: 'get',
    params: query
  })
}

/**
 *  	项目分项列表
 * @param query
 * @returns {AxiosPromise}
 */
export function subList(query) {
  return request({
    url: '/module/projectsub/projectsub/list',
    method: 'get',
    params: query
  })
}


/**
 * 分项新增
 * @param data
 * @returns {AxiosPromise}
 */
export function subAdd(data) {
  return request({
    url: '/module/projectsub/projectsub',
    method: 'post',
    data: data
  })
}

export function modifyAdd(data) {
  return request({
    url: '/module/projectsub/projectsub',
    method: 'put',
    data: data
  })
}


/**
 * 分项详情
 * @param leaderId
 * @returns {AxiosPromise}
 */
export function projectsubDetail(leaderId) {
  return request({
    url: '/module/projectsub/projectsub/'+leaderId,
    method: 'get',
  })
}



export function deleteProjectsub(organzationId) {
  return request({
    url: '/module/projectsub/projectsub/' + organzationId,
    method: 'delete',
  })
}
