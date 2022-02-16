import request from '@/utils/request'


// 获取预算模块列表数据
/* 参数说明query : {
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

export function getlist(query) {
  return request({
    url: '/module/budget/template/getlist',
    method: 'get',
    params: query
  });
}

// 获取预算模板新增默认数据
export function getBudgetTemplateAddInfo() {
  return request({
    url: '/module/budget/template/getAddInfo',
    method: 'get',
  });
}

// 获取预算模板主表单详细信息(编辑查看时用到)
export function getBudgetTemplateDetail(templateSid) {
  return request({
    url: '/module/budget/template/'+templateSid,
    method: 'get',
  });
}

// 删除预算模板数据(多个时逗号隔开传模板id)
export function deleteBudgetTemplateDetail(templateSid) {
  return request({
    url: '/module/budget/template/'+templateSid,
    method: 'delete',
  });
}

//保存模板主表，非人工模板、人力配置模板
export function saveBudgetTemplateAll(template, professionTemplate, subjectTemplate) {
  return request({
    url: '/module/budget/template/saveOrUpdateAll',
    method: 'post',
    data:{
      template : JSON.stringify(template),
      professionTemplate :  JSON.stringify([]),
      subjectTemplate :  JSON.stringify([])
    },
  });
}

// 获取预算模板的人力配置模板列表数据
export function getBudgetTemplateArtificial(templateSid) {
  return request({
    url: '/module/budget/professionRole/listNoPage/'+templateSid,
    method: 'get',
  });
}

// 获取预算模板的非人工成本预算
export function getBudgetTemplateNotArtificialById(query) {
  return request({
    url: '/module/budget/config/getNotArtificialConfigByBudgetById',
    method: 'get',
    params: query
  });
}

// 获取项目角色模版列表数据
export function getRoleListNoScope() {
  return request({
    url: '/system/projectRoleTemplate/getRoleListNoScope',
    method: 'get',
  });
}

/*预算模板*/
//基础信息查询
export function getDictBaseData(dictType) {
  return request({
    url: '/system/dict/data/getDictBaseData/'+dictType,
    method: 'get',
  })
}
//用户信息基础信息查询查询
export function getBaseUserlist(query) {
  return request({
    url: '/system/user/getBaseUserlist',
    method: 'get',
    params:query
  })
}
//预算模板列表查询
export function getsubjectTemplate(templateSid) {
  return request({
    url: '/module/budget/subjectTemplate/listNoPage/'+templateSid,
    method: 'get',
  })
}


export function getsubjectTemplateSubjectById(templateSubjectSid) {
  return request({
    url: '/module/budget/subjectTemplate/'+templateSubjectSid,
    method: 'get',
    params: query
  })
}
//新增预算模板

//预算科目查重
export function getsubjectListBycc(query) {
  return request({
    url: '/module/budget/subject/list',
    method: 'get',
    params: query
  })
}
//查询专业角色
export function getProfessionInfo(query) {
  return request({
    url: '/module/budget/professionRole/getProfessionInfo',
    method: 'get',
    params: query
  })
}
//获取项目类型级联下拉数据
export function getCascadeData(typeCode) {
  return request({
    url: '/system/cascadeData/getCascadeData/' + typeCode,
    method: 'get'
  })
}

// 新增非人工成本预算
export function addBudgetTemplateNotArtificial(data) {
    return request({
        url: '/module/budget/subjectTemplate',
        method: 'post',
        data: data
    });
}
// 修改非人工成本预算
export function editBudgetTemplateNotArtificial(data) {
    return request({
        url: '/module/budget/subjectTemplate',
        method: 'put',
        data: data
    });
}
// 删除预算非人工成本
export function delBudgetTemplateNotArtificial(templateSubjectSids) {
    return request({
      url: '/module/budget/subjectTemplate/' + templateSubjectSids,
      method: 'delete'
    })
}
// 新增阶段专业模板数据
export function addStageProfession(data) {
    return request({
      url: '/module/budget/stageProfession',
      method: 'post',
      data: data
    })
}
// 修改阶段专业模板数据
export function updateStageProfession(data) {
    return request({
      url: '/module/budget/stageProfession',
      method: 'put',
      data: data
    })
}
// 查询阶段专业模板数据列表
export function listStageProfession(query) {
    return request({
      url: '/module/budget/stageProfession/list',
      method: 'get',
      params: query
    })
}
// 删除阶段专业模板数据
export function delStageProfession(stageProfessionSid) {
    return request({
      url: '/module/budget/stageProfession/' + stageProfessionSid,
      method: 'delete'
    })
}

// 根据项目策划sid查询部门列表
export function getDeptListByPlanSid(query) {
    return request({
      url: '/project/planning/getDeptListByPlanSid',
      method: 'get',
      params: query
    })
}

// 根据部门id查询阶段列表
export function getStageListByDeptId(query) {
    return request({
      url: '/project/planning/getStageListByDeptId',
      method: 'get',
      params: query
    })
}

// 查询预算非人工成本可以选择的科目
export function getSelectSubjectList(query) {
    return request({
      url: '/module/budget/subjectTemplate/getSelectSubjectList',
      method: 'get',
      params: query
    })
}

// 新增预算非人工成本
export function addBudgetNotArtificial(data) {
    return request({
      url: '/module/budget/config',
      method: 'post',
      data: data
    })
}

// 新增预算非人工成本
export function updateBudgetNotArtificial(data) {
    return request({
      url: '/module/budget/config',
      method: 'put',
      data: data
    })
}

// 根据预算id查询非人工成本列表
export function notArtificialConfigList(query) {
    return request({
      url: '/module/budget/config/notArtificialConfigList',
      method: 'get',
      params: query
    })
}

// 删除预算非人工成本
export function deleteNotArtificialConfig(notArtificialConfigSids) {
    return request({
      url: '/module/budget/config/'+notArtificialConfigSids,
      method: 'delete',
    });
}

// 预算中咨询协作分包的合计值
export function getSubContractSum(query) {
    return request({
      url: '/module/budget/config/getSubContractSum',
      method: 'get',
      params: query
    })
}

// 预算中所欲科目费用的合计值
export function getContractSum(query) {
    return request({
      url: '/module/budget/config/getContractSum',
      method: 'get',
      params: query
    })
}

// 预算中公摊的合计值
export function getPublicPoolSum(query) {
    return request({
      url: '/module/budget/config/getPublicPoolSum',
      method: 'get',
      params: query
    })
}
