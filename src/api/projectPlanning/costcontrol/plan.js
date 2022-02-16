import request from '@/utils/request'

/**
 * 前期项目列表
 * @param query
 * @returns {AxiosPromise}
 */
export function projectEstablishList(query) {
  return request({
    url: '/module/projectPlanning/projectEstablishList',
    method: 'get',
    params: query
  })
}

/**
 * 项目策划列表
 * @param query
 * @returns {AxiosPromise}
 */
export function planList(query) {
  return request({
    url: '/module/projectPlanning/list',
    method: 'get',
    params: query
  })
}



/**
 * 添加策划
 * @param data
 * @returns {AxiosPromise}
 */
export function addPlan(data) {
  return request({
    url: '/module/projectPlanning',
    method: 'post',
    data: data
  })
}


/**
 * 策划修改
 * @param data
 * @returns {AxiosPromise}
 */
export function updatePlan(data) {
  return request({
    url: '/module/projectPlanning',
    method: 'put',
    data: data
  })
}


/**
 * 策划详情
 * @param projectPlanningSid
 * @returns {AxiosPromise}
 */
export function planDetail(projectPlanningSid) {
  return request({
    url: '/module/projectPlanning/' + projectPlanningSid,
    method: 'get'
  })
}

/**
 * 删除策划
 * @param projectPlanningSid
 * @returns {AxiosPromise}
 */
export function delPlan(projectPlanningSid) {
  return request({
    url: '/module/projectPlanning/' + projectPlanningSid,
    method: 'delete'
  })
}

/**
 * 阶段工时开关
 * @param query
 * @returns {AxiosPromise}
 */
export function stageHourOpen(query) {
  return request({
    url: '/module/projectPlanning/stageHourOpen',
    method: 'post',
    params: query
  })
}

/**
 * 人员开关
 * @param data
 * @returns {AxiosPromise}
 */
export function memberHourOpen(data) {
  return request({
    url: '/module/projectPlanning/memberHourOpen',
    method: 'post',
    data: data
  })
}

/** 参数说明query : {
  searchValue : "搜索参数",
  pageNum : "每页显示记录数",
  pageSize : "当前记录起始索引",
  orderByColumn : "排序列",
  isAsc : "排序的方向 "desc" 或者 "asc"",
} */
export function getBudgetTemplateList(query) {
  return request({
    url: '/module/budget/template/list',
    method: 'get',
    params: query
  });
}

/**
 * 获取项目立项详情
 * @param projectSid
 * @returns {AxiosPromise}
 */
export function projectDetail(projectSid) {
  return request({
    url: '/module/projectPlanning/projectDetail/' + projectSid,
    method: 'get'
  })
}


/**
 * 获取部门列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getDeptList(query) {
  return request({
    url: '/module/projectPlanning/getDeptList',
    method: 'get',
    params: query
  });
}


/**
 * 查询专业列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getStageProfessionRoleList(query) {
  return request({
    url: '/module/projectPlanning/getStageProfessionRoleList',
    method: 'get',
    params: query
  });
}

/**
 * 删除用户
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteMembers(data) {
  return request({
    url: '/module/projectPlanning/deleteMembers',
    method: 'delete',
    data: data
  })
}

/**
 * 修改人员状态
 * @param data
 * @returns {AxiosPromise}
 */
export function updateMemberStatus(data) {
  return request({
    url: '/module/projectPlanning/updateMemberStatus',
    method: 'post',
    data: data
  })
}

/**
 * 项目策划数据导出
 * @param query
 * @returns {AxiosPromise}
 */
export function exportPlanFile(query) {
  return request({
    url: '/module/projectPlanning/export',
    method: 'get',
    params: query
  })
}

/**
 * 选择阶段专业角色搜索
 * @param query
 * @returns {AxiosPromise}
 */
 export function searchSelectValue(query) {
  return request({
    url: '/module/projectPlanning/getStageProfessionRoleList',
    method: 'get',
    params: query
  })
}

/**
 * 获取项目模板列表
 * @param query
 * @returns {AxiosPromise}
 */
 export function projtmplTmplInit(query) {
  return request({
    url: '/module/projtmpl/tmpl/init',
    method: 'get',
    params: query
  })
}

