import request from '@/utils/request'

// 查询项目策划列表
export function listProjectPlanning(query) {
  return request({
    url: '/project/planning/list',
    method: 'get',
    params: query
  })
}

// 查询项目策划详细
export function getProjectPlanning(projectPlanningSid) {
  return request({
    url: '/project/planning/' + projectPlanningSid,
    method: 'get'
  })
}

/**
 * 根据项目版本获取信息
 * @param projectPlanningSid
 * @param version
 * @returns {AxiosPromise}
 */
export function getProjectVersionPlanning(projectPlanningSid,version) {
  return request({
    url: `/project/planning/getInfo/${projectPlanningSid}/${version}`,
    method: 'get'
  })
}


// 新增项目策划
export function addProjectPlanning(data) {
  return request({
    url: '/project/planning/add',
    method: 'post',
    data: data
  })
}

// 修改项目策划
export function updateProjectPlanning(data) {
  return request({
    url: '/project/planning',
    method: 'put',
    data: data
  })
}

// 查询并返回可以删除的项目策划
export function selectDeleteSids(projectPlanningSid) {
  return request({
    url: '/project/planning/selectDeleteSids/' + projectPlanningSid,
    method: 'post'
  })
}

// 删除项目策划
export function delProjectPlanning(projectPlanningSid) {
  return request({
    url: '/project/planning/delete/' + projectPlanningSid,
    method: 'delete'
  })
}

// 导出项目策划
export function exportProjectPlanning(query) {
  return request({
    url: '/project/planning/export',
    method: 'get',
    params: query
  })
}

// 查询项目策划列表
export function listProject(query) {
    return request({
      url: '/project/planning/projectList',
      method: 'get',
      params: query
    })
}

// 项目立项详细信息
export function projectDetail(projectSid) {
    return request({
      url: '/project/planning/projectDetail/' + projectSid,
      method: 'get'
    })
}

// 获取项目策划sid
export function getSid() {
    return request({
      url: '/project/planning/getSid',
      method: 'get'
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

// 查询角色列表
export function getRoleList(query) {
    return request({
      url: '/project/planning/getRoleList',
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

// 查询项目策划是否有项目组成员未填写姓名
export function getNoNameMember(query) {
    return request({
      url: '/project/planning/getNoNameMember',
      method: 'get',
      params: query
    })
}

// 新增项目成员
export function addProjectMember(data) {
    return request({
      url: '/project/planning/addProjectMember',
      method: 'post',
      data: data
    })
}

// 查询项目组成员列表
export function projectMemberList(query) {
    return request({
      url: '/project/planning/projectMemberList',
      method: 'get',
      params: query
    })
}


export function projectMemberList001(query) {
  return request({
    url: '/project/planning/projectMemberList001',
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

export function addSchedule(data) {
  return request({
    url: '/project/schedule/add',
    method: 'post',
    data: data
  })
}


// export function projectScheduleList(query) {
//   console.log(query);
//     return request({
//       url: '/project/schedule/list',
//       method: 'get',
//       params: query
//     })
// }

// 新增调整数据
export function addEditData(data) {
    return request({
      url: '/project/planning/addEditData/' + data,
      method: 'post'
    })
}

// 获取最新的可以修改的数据
export function getNewPlanData(query) {
    return request({
      url: '/project/planning/getNewPlanData',
      method: 'get',
      params: query
    })
}

// 删除项目策划成员
export function deleteMember(data) {
    return request({
      url: '/project/planning/deleteMember',
      method: 'delete',
      data: data
    })
}

// 修改策划人员名称
export function updateMemberName(data) {
    return request({
      url: '/project/planning/updateMemberName',
      method: 'post',
      data: data
    })
}

// 修改策划人员状态
export function updateMemberStatus(data) {
    return request({
      url: '/project/planning/updateMemberStatus',
      method: 'post',
      data: data
    })
}

// 查询要删除的人员是否能够删除
export function getIsDelete(memberSids) {
    return request({
      url: '/project/planning/isDelete/' + memberSids,
      method: 'get'
    })
}

// 复制项目策划人员
export function copyMember(memberSids) {
    return request({
      url: '/project/planning/copyMember/' + memberSids,
      method: 'post'
    })
}

// 修改项目进度数据
export function updateSchedule(data) {
    return request({
      url: '/project/planning/updateSchedule',
      method: 'post',
      data: data
    })
}

// 查询有哪些阶段和人员
export function stageAndMemberList(query) {
    return request({
      url: '/project/planning/stageAndMemberList',
      method: 'get',
      params: query
    })
}

// 开通和关闭阶段工时
export function stageHourOpen(data) {
    return request({
      url: '/project/planning/stageHourOpen',
      method: 'post',
      data: data
    })
}

// 开通和关闭人员工时
export function memberHourOpen(data) {
    return request({
      url: '/project/planning/memberHourOpen',
      method: 'post',
      data: data
    })
}

// 获取策划模板主表单详细信息(编辑查看时用到)
export function getBudgetTemplateDetail(templateSid) {
    return request({
      url: '/module/budget/template/'+templateSid,
      method: 'get',
    });
  }


export function adjustList(budgetSid) {
  return request({
    url: '/module/budget/adjust/'+budgetSid,
    method: 'get',
  });
}
