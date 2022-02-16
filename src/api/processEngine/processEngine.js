import request from '@/utils/request'



// 获取代办列表
export function getTodoList(query) {
  return request({
    url: '/workflow/getTodoList',
    method: 'get',
    params: query
  })
}

// 获取全部代办列表
export function getAllTodo(query) {
  return request({
    url: '/workflow/getAllTodo',
    method: 'get',
    params: query
  })
}


// 获取全部已办办列表
export function getAllHavedo(query) {
  return request({
    url: '/workflow/getAllHavedo',
    method: 'get',
    params: query
  })
}



// 获取代办详情信息
export function getTodoDetail(query) {
  return request({
    url: '/workflow/getTodoDetail/'+query.todoId,
    method: 'get',
  })
}

// 获取审批记录
export function getApprovalRecord(query) {
  return request({
    url: '/workflow/getApprovalRecord/'+query.businessType+'/'+query.businessId,
    method: 'get',
  })
}


// 获取审批流程数据
export function getNodeList(query) {
  return request({
    url: '/process/nodeList/'+query.processId,
    method: 'get',
  })
}

// 获取审批流程数据
export function getRejectFlowTask(query) {
  return request({
    url: '/workflow/rejectFlowTask',
    method: 'POST',
    data: query
  })
}



// 获取审批流程数据
export function getTreeselect(query) {
  return request({
    url: '/system/dept/treeselect',
    method: 'get',
  })
}


// 获取审批流程数据
export function getUserList(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params:query
  })
}

// 获取审批流程数据
export function getNodeDetail(query) {
  return request({
    url: '/workflow/getNodeDetail/'+query.todoId,
    method: 'get',
  })
}


// 根据线主键获取用户
export function getUserByLineId(query) {
  return request({
    url: '/workflow/getUserByLineId/'+query.lineId+'/'+query.businessId,
    method: 'get',
  })
}

export function getUserByLineId2(query) {
  return request({
    url: '/workflow/getUserByLineId/'+query.lineId+'/'+query.businessId,
    method: 'get',
  })
}


// 同意审批
export function getPassFlowTask(query) {
  return request({
    url: '/workflow/passFlowTask',
    method: 'POST',
    data: query
  })
}


// 移交
export function getTransferFlowTask(query) {
  return request({
    url: '/workflow/transferFlowTask',
    method: 'POST',
    data: query
  })
}


// 中止
export function getTermination(query) {
  return request({
    url: '/workflow/termination',
    method: 'POST',
    data: query
  })
}


//  获取我的已办数据列表
export function getHavedoList(query) {
  return request({
    url: '/workflow/getHavedoList',
    method: 'get',
    params:query,
  })
}

//  获取我的已办数据列表详情数据
export function getHavedoDetail(query) {
  return request({
    url: '/workflow/getHavedoDetail/'+query.havedoId,
    method: 'get',
  })
}

//  获取我的已办数据列表
export function getUserApproveList(query) {
  return request({
    url: '/workflow/getUserApproveList',
    method: 'get',
    params:query
  })
}


//  获取我的已办数据列表详情数据
export function getTaskDetail(query) {
  return request({
    url: '/workflow/getTaskDetail/'+query.taskId,
    method: 'get',
  })
}


//  获取我的已办数据列表详情数据
export function getWithdrawFlow(query) {
  return request({
    url: '/workflow/withdrawFlow/'+query.businessId,
    method: 'get',
  })
}


//  审批启动获取是否是预定义流程
export function getWhetherHaveWorkflow(query) {
  return request({
    url: '/workflow/getWhetherHaveWorkflow/'+query.businessType,
    method: 'get',
  })
}

export function getFlowListByBusinessType(query) {
  return request({
    url: '/workflow/getFlowListByBusinessType/'+query.businessType,
    method: 'get',
  })
}

export function getFlowLineList(query) {
  return request({
    url: '/workflow/getFlowLineList',
    method: 'get',
    params: query
  })
}


// 启动项目
export function startFlowTask(query) {
  return request({
    url: '/workflow/startFlowTask',
    method: 'POST',
    data: query
  })
}


// 获取流程数据列表
export function getProcessList(query) {
  return request({
    url: '/process/list',
    method: 'get',
    params: query

  })
}


// 新增流程提交接口
export function getProcessAdd(query) {
  return request({
    url: '/process/add',
    method: 'post',
    data: query

  })
}

// 编辑流程提交接口
export function getProcessEdit(query) {
  return request({
    url: '/process/edit',
    method: 'put',
    data: query

  })
}

// 编辑流程提交接口
export function processRemove(query) {
  return request({
    url: '/process/remove',
    method: 'DELETE',
    params: query

  })
}







// 获取业务数据列表
export function getbusinessList(query) {
  return request({
    url: '/process/getBusinessList',
    method: 'get',
  })
}



// 保存设置的节点信息
export function saveNodeList(query) {
  return request({
    url: '/process/saveNodeList',
    method: 'post',
    data: query
  })
}

export function saveNodeSetting(query) {
  return request({
    url: '/process/saveNodeSetting',
    method: 'post',
    data: query
  })
}


export function getRoleList(query) {
  return request({
    url: '/process/getRoleList',
    method: 'get',
  })
}


// 获取节点详情
export function getNodeById(query) {
  return request({
    url: '/process/getNodeById/'+query.nodeId,
    method: 'get',
  })
}


// 获取业务信息
export function getTableColumnsByNodeId(query) {
  return request({
    url: '/process/getTableColumnsByNodeId/'+query.nodeId,
    method: 'get',
  })
}


// 保存线的信息
export function saveCustomRules(query) {
  return request({
    url: '/process/saveCustomRules',
    method: 'post',
    data: query
  })
}

// 获取线的条件信息
export function getCustomRules(query) {
  return request({
    url: '/process/getCustomRules/'+query.nodeId,
    method: 'get',
  })
}

// 获取抄送的信息
export function getCcList(query) {
  return request({
    url: '/workflow/getCcList',
    method: 'get',
    params:query
  })
}


// 催办任务
export function updateUrge(query) {
  return request({
    url: '/workflow/urge/'+query.todoId,
    method: 'get',
  })
}

export function getLunarDate() {
  return request({
    url: '/common/getLunarDate',
    method: 'get'
  })
}

//标记已读
export function updateIsRead(todoId) {
  return request({
    url: '/workflow/updateIsRead?todoId='+todoId,
    method: 'get',
  })
}

/**
 *  获取待办id
 * @param businessId
 * @returns {AxiosPromise}
 */
export function getTodoListByBusinessId(businessId) {
  return request({
    url: '/workflow/getTodoListByBusinessId?businessId='+businessId,
    method: 'get',
  })
}


/**
 * 获取审批记录
 * @param businessId
 * @returns {AxiosPromise}
 */
export function getApproveListByBusinessId(businessId) {
  return request({
    url: '/workflow/getApprovalRecord/epc_project_approve/'+businessId,
    method: 'get',
  })
}

/**
 * 获取流程图信息
 * @param businessId
 * @returns {AxiosPromise}
 */
export function processIdByBusinessId(businessId) {
  return request({
    url: '/workflow/processIdByBusinessId?businessId='+businessId,
    method: 'get',
  })
}
























