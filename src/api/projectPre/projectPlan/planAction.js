import request from '@/utils/request'
/*
* 行动策划列表
* */
export function actionList(query) {
  return request({
    url: '/module/projplanact/action/list',
    method: 'get',
    params: query
  })
}

/*
  * 行动策划模板删除
  */
export function actionDel(actionId) {
  return request({
    url: '/module/projplanact/action/' + actionId,
    method: 'delete',
  })
}

/**
 * 任务列表
 * @param query
 * @returns {AxiosPromise}
 */
export function actionTaskList(query) {
  return request({
    url: '/module/projplanact/task/plan_act_task_list',
    method: 'get',
    params: query
  })
}

/**
 * 选择策划模板保存模板任务到前期项目策划任务中
 * @param query
 * @returns {AxiosPromise}
 */
export function actionTaskAddTemplate(query) {
  return request({
    url: '/module/projplanact/task/acttmpl',
    method: 'post',
    data: query
  })
}

/**
 * 任务详情
 * @param taskId
 * @returns {AxiosPromise}
 */
export function actionTaskDetail(taskId) {
  return request({
    url: '/module/projplanact/task/' + taskId,
    method: 'get'
  })
}

/**
 * 选择前期项目
 * @param query
 * @returns {AxiosPromise}
 */
export function actionProjectList(query) {
  return request({
    url: '/module/projlib/library/proj_libraray_planact_list',
    method: 'get',
    params: query
  })
}




/**
 *  前期项目行动策划主信息保存
 * @param query
 * @returns {AxiosPromise}
 */
export function actionMainSave(query) {
  return request({
    url: '/module/projplanact/action',
    method: 'post',
    data: query
  })
}

/**
 * 前期项目行动策划主信息详情
 * @param taskId
 * @returns {AxiosPromise}
 */
export function actionMainDetail(taskId) {
  return request({
    url: '/module/projplanact/action/' + taskId,
    method: 'get'
  })
}

/**
 * 任务新增
 * @param query
 * @returns {AxiosPromise}
 */
export function actionTaskAdd(query) {
  return request({
    url: '/module/projplanact/task',
    method: 'post',
    data: query
  })
}

/**
 * 任务修改
 * @param query
 * @returns {AxiosPromise}
 */
export function actionTaskEdit(query) {
  return request({
    url: '/module/projplanact/task',
    method: 'put',
    data: query
  })
}

/**
 * 任务删除
 * @param taskId
 * @returns {AxiosPromise}
 */
export function actionTaskDel(taskId) {
  return request({
    url: '/module/projplanact/task/' + taskId,
    method: 'delete',
  })
}

/**
 * 添加子任务
 * @param query
 * @returns {AxiosPromise}
 */
export function addChildrenTask(query) {
  return request({
    url: '/module/projplanact/task/children_task',
    method: 'post',
    data: query
  })
}



/**
 * 添加关联任务
 * @param query
 * @returns {AxiosPromise}
 */
export function addLinkTask(query) {
  return request({
    url: '/module/projplanact/task/pre_task',
    method: 'post',
    data: query
  })
}

/**
 * 关联任务删除
 * @param taskId
 * @returns {AxiosPromise}
 */
export function actionLinkTaskDel(params) {
  return request({
    url: '/module/projplanact/pretask' ,
    method: 'delete',
    data:params
  })
}

/**
 * 前期项目行动策划-人员策划同步前期项目库项目机会跟进组织人员
 * @param query
 * @returns {AxiosPromise}
 */
export function personCopy(query) {
  return request({
    url: '/module/projplanact/personnel/personcopy',
    method: 'post',
    data: query
  })
}

/**
 * 前期项目行动策划-人员策划人员树
 * @param taskId
 * @returns {AxiosPromise}
 */
export function personTree(taskId,projLibId) {
  return request({
    url: '/module/projplanact/personnel/persontree',
    method: 'get',
    params:{planActId:taskId,projLibId:projLibId}
  })
}

/**
 * 组织架构人员添加
 * @param query
 * @returns {AxiosPromise}
 */
export function personAdd(query) {
  return request({
    url: '/module/projplanact/personnel',
    method: 'post',
    data: query
  })
}

/**
 * 行动策划人员删除
 * @param taskId
 * @returns {AxiosPromise}
 */
export function personDel(taskId) {
  return request({
    url: '/module/projplanact/personnel/' + taskId,
    method: 'delete',
  })
}



export function copyPersonProjectList(query) {
  return request({
    url: '/module/projplanact/action/cp_person_proj_list',
    method: 'get',
    params: query
  })
}

/**
 * 从其他项目中复制成员
 * @param query
 * @returns {AxiosPromise}
 */
export function  copyPersonAdd(query) {
  return request({
    url: '/module/projplanact/personnel/cp_plan_act_person',
    method: 'post',
    data: query
  })
}


////////行动组织修改 开始////////

/**
 * 行动组织人员列表
 * @param query
 * @returns {AxiosPromise}
 */
export function personnelList(query) {
  return request({
    url: '/module/projplanact/personnel/list',
    method: 'get',
    params: query
  })
}

/**
 * 人员部门-保存/修改
 * @param query
 * @returns {AxiosPromise}
 */
export function  personneldeptAdd(query) {
  return request({
    url: '/module/projplanact/personneldept',
    method: 'post',
    data: query
  })
}

/**
 * 部门修改
 * @param query
 * @returns {AxiosPromise}
 */
export function  personneldeptEdit(query) {
  return request({
    url: '/module/projplanact/personneldept',
    method: 'put',
    data: query
  })
}

/**
 * 人员-保存/修改
 * @param query
 * @returns {AxiosPromise}
 */
export function  personNewAdd(query) {
  return request({
    url: '/module/projplanact/personnel',
    method: 'post',
    data: query
  })
}

/**
 * 人员角色修改
 * @param query
 * @returns {AxiosPromise}
 */
export function  perTypeEdit(query) {
  return request({
    url: '/module/projplanact/personnel/perType',
    method: 'put',
    data: query
  })
}

/**
 * 人员移除
 * @param taskId
 * @returns {AxiosPromise}
 */
export function personnelDel(taskId) {
  return request({
    url: '/module/projplanact/personnel/' + taskId,
    method: 'delete',
  })
}

/**
 * 部门移除
 * @param taskId
 * @returns {AxiosPromise}
 */
export function personneldeptDel(taskId) {
  return request({
    url: '/module/projplanact/personneldept/' + taskId,
    method: 'delete',
  })
}

/**
 * 前期项目库-更新业主
 * @param query
 * @returns {AxiosPromise}
 */
export function custNameEdit(query) {
  return request({
    url: '/module/projlib/library/custName',
    method: 'put',
    data: query
  })
}

/**
 * 前期项目库-更新监理
 * @param query
 * @returns {AxiosPromise}
 */
export function superviseNameEdit(query) {
  return request({
    url: '/module/projlib/library/superviseName',
    method: 'put',
    data: query
  })
}


////////行动组织修改 结束////////




/*
 * 预算策划模板新增
 */
export function planBudgetTemplateAdd(query) {
  return request({
    url: '/module/plan/planBudgetTemplate',
    method: 'post',
    data: query
  })
}
/*
 * 预算策划模板修改
 */
export function planBudgetTemplateRevise(query) {
  return request({
    url: '/module/plan/planBudgetTemplate',
    method: 'put',
    data: query
  })
}
/*
*预算策划模板详情
* */
export function planBudgetTemplateDetail(budgetTemplateSid) {
  return request({
    url: '/module/plan/planBudgetTemplate/' + budgetTemplateSid,
    method: 'get'
  })
}

/*
询策略策划模板列表
* */
export function strategyTemplateList(query) {
  return request({
    url: '/module/plan/strategyTemplate/list',
    method: 'get',
    params: query
  })
}
/*
* 查询策略策划模板详情
* */
export function strategyTemplateDetail(strategyTemplateSid) {
  return request({
    url: '/module/plan/strategyTemplate/' + strategyTemplateSid,
    method: 'get'
  })
}

/*
* 查询行动策划模板列表
* */
export function actionTemplateList(query) {
  return request({
    url: '/module/plan/actionTemplate/list',
    method: 'get',
    params: query
  })
}
/*
* 查询行动策划模板详情
* */
export function actionTemplateDetail(actionTemplateSid) {
  return request({
    url: '/module/plan/actionTemplate/' + actionTemplateSid,
    method: 'get'
  })
}
/*
 * 行动策划模板新增
 */
export function actionTemplateAdd(query) {
  return request({
    url: '/module/plan/actionTemplate',
    method: 'post',
    data: query
  })
}
/*
 * 行动策划模板修改
 */
export function actionTemplateRevise(query) {
  return request({
    url: '/module/plan/actionTemplate',
    method: 'put',
    data: query
  })
}
/*
  * 删除行动策划模板
  */
export function deleteAction(actionTemplateSid) {
  return request({
    url: '/module/plan/actionTemplate/' + actionTemplateSid,
    method: 'delete',
  })
}

/**
 * 前期项目行动策划-前期项目信息（选择项目新增行动策划）初始数据
 * @param actionTemplateSid
 * @returns {AxiosPromise}
 */
export function actionProjectInit(actionTemplateSid) {
  return request({
    url: '/module/projplanact/action/init/' + actionTemplateSid,
    method: 'get'
  })
}

/**
 * 任务排序
 * @param query
 * @returns {AxiosPromise}
 */
export function taskOrderNum(query) {
  return request({
    url: '/module/projplanact/task/orderNum',
    method: 'post',
    data: query
  })
}

