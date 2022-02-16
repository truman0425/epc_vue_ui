import request from '@/utils/request'

// 查询部门列表
export function getSubjectList(query) {
  return request({
    url: '/module/budget/subject/list',
    method: 'get',
    params: query
  })
}


export function getSubjectListById(query) {
  return request({
    url: '/module/budget/subject/'+subjectSid,
    method: 'get',
    params: query
  })
}


export function saveOrUpdate(query) {
  return request({
    url: '/module/budget/subject/saveOrUpdate',
    method: 'post',
    data: query
  })
}


export function deleteSubject(query) {
  return request({
    url: '/module/budget/subject/'+ query,
    method: 'delete',
  })
}

/*预算列表*/
export function querybaseList(query) {
  return request({
    url: '/module/budget/compile/baseList',
    method: 'get',
    params: query
  })
}
/*删除列表*/
export function deletebaseList(query) {
  return request({
    url: '/module/budget/compile/'+ query,
    method: 'delete',
  })
}
/*项目列表*/
export function querybudgetProjectList(query) {
  return request({
    url: '/sealApply/getProjectEstablishList',
    method: 'get',
    params: query
  })
}


/*选择项目生成预算编制*/
export function getProjectList(query) {
    return request({
      url: '/module/budget/compile/getProjectList',
      method: 'get',
      params: query
    })
  }




/*选择项目生成预算编制*/
export function checkEnableAddBudget(query) {
  return request({
    url: '/module/budget/compile/checkEnableAddBudget/'+query,
    method: 'get',
  })
}
/*根据项目id获取指定项目新增预算数据初始化的默认数据*/
export function getAddBudgetInfo(query) {
  return request({
    url: '/module/budget/compile/getAddBudgetInfo/'+query,
    method: 'get',
  })
}
/*获取预算编制列表跳转后详细信息*/
export function getGotoInfoById(budgetSid) {
  return request({
    url: '/module/budget/compile/getGotoInfoById/'+budgetSid,
    method: 'get',
  })
}

/*保存预算编制*/
export function saveAllBudgetData(data) {
  return request({
    url: '/module/budget/compile/saveAllBudgetData',
    method: 'post',
    data: data,
    /*headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }*/
  })
}
/*获取预算调整记录/module/budget/adjust/adjustlist/{projectSid}*/
export function getadjustlist(projectSid) {
  return request({
    url: '/module/budget/adjust/adjustlist/'+projectSid,
    method: 'get',
  })
}
/*查询5个taps*/
export function getDeliverResultsByBudget(budgetSid) {
  return request({
    url: '/module/budget/results/getDeliverResultsByBudget/'+budgetSid,
    method: 'get',
  })
}
export function getWorkPlanByBudget(budgetSid) {
  return request({
    url: '/module/budget/plan/getWorkPlanByBudget/'+budgetSid,
    method: 'get',
  })
}
export function getValueAllocationByBudget(budgetSid) {
  return request({
    url: '/module/budget/allocation/getValueAllocationByBudget/'+budgetSid,
    method: 'get',
  })
}
// export function saveProjectValueAllocation() {
//   return request({
//     url: '/module/budget/allocation/saveProjectValueAllocation',
//     method: 'get',
//   })
// }
export function getArtificialConfigByBudget(budgetSid) {
  return request({
    url: '/module/budget/artificialConfig/getArtificialConfigByBudget/'+budgetSid,
    method: 'get',
  })
}
/*查询非人工配置列表*/
export function getNotArtificialConfigByBudget(query) {
  return request({
    url: '/module/budget/config/getNotArtificialConfigByBudget',
    method: 'get',
    params: query
  })
}
/*查询科目*/
export function getNotArtificialConfigListByBudget(query) {
  return request({
    url: '/module/budget/config/getNotArtificialConfigListByBudget',
    method: 'get',
    params: query
  })
}
/*查询下拉框*/

export function getDictBaseData(dictType) {
  return request({
    url: '/system/dict/data/getDictBaseData/'+dictType,
    method: 'get',
  })
}
/*查询组织人员/list/exclude/{deptId}*/
export function queryExclude(deptId) {
  return request({
    url: '/list/exclude/'+deptId,
    method: 'get',
  })
}
/*查询人员/system/user/getBaseUserlist*/
export function getBaseUserlist(query) {
  return request({
    url: '/system/user/getBaseUserlist',
    method: 'get',
    params:query
  })
}
/*查询预算科目列表/module/budget/subject/list*/
export function getsubjectlistByValue(query) {
  return request({
    url: '/module/budget/subject/list',
    method: 'get',
    params: query
  })
}
/*查询部门排查指定节点集合*/
export function getexcludeList(deptId) {
 /* return request({
    url: '/system/dept/list/exclude/'+deptId,
    method: 'get',
  })*/
  return request({
    url: '/system/dept/list/excludeMore/'+deptId,
    method: 'get',
  })
}

/*获取可选专业数据/module/budget/professionRole/getProfessionInfo*/
export function getProfessionInfo(query) {
  return request({
    url: '/module/budget/professionRole/getProfessionInfo',
    method: 'get',
    params:query
  })
}
//保存调整记录（保存调试数据并获取新版本预算页面编辑页自动带入的数据）
export function saveadjust(query) {
  return request({
    url: '/module/budget/adjust',
    method: 'post',
    data: query
  })
}
//侧边栏项目合同数据获取
export function getBudgetSideBarInfoByProjectSid(projectSid) {
  return request({
    url: '/module/budget/compile/getBudgetSideBarInfoByProjectSid/'+projectSid,
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
/*流转接口*/
export function approveBudget(budgetSid) {
  return request({
    url: '/module/budget/compile/approveBudget/'+budgetSid,
    method: 'get',
  })
}

//科目查重/module/budget/subject/list
export function getsubjectListBycc(query) {
  return request({
    url: '/module/budget/subject/list',
    method: 'get',
    params: query
  })
}

// 导出预算科目
export function exportBudgetSubject(query) {
  return request({
    url: '/module/budget/subject/export',
    method: 'get',
    params: query
  })
}

// 导出指定预算
export function exportBudgetById(budgetSid) {
  return request({
    url: '/module/budget/compile/export/' + budgetSid,
    method: 'get',
  })
}

// 导出所有预算
export function exportBudget() {
    return request({
      url: '/module/budget/compile/export',
      method: 'get',
    })
}

// 查询最新版是否通过审核
export function selectNewVersion(data) {
    return request({
      url: '/module/budget/compile/selectNewVersion',
      method: 'post',
      data: data
    })
}


  export function selectDeptByParentIdNew(parentId) {
    return request({
      url: '/system/dept/selectMajors/' + parentId,
      method: 'get'
    })
  }

/**
 * 调整记录列表
 * @param query
 * @returns {AxiosPromise}
 */
export function budgetRecordList(query) {
  return request({
    url: '/module/budget/adjust/list/',
    method: 'get',
    params: query
  })
}
