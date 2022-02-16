import request from '@/utils/request'

// 查询部门列表
export function projectList(query) {
  return request({
    url: '/module/epcproject/list',
    method: 'post',
    params: query
  })
}

export function getprojectList(query) {
  //debugger
  return request({
    url: '/monthlyReport/list',
    method: 'get',
    params: query
  })
}

//新增
export function projectAdd() {
  return request({
    url: '/module/epcproject/add',
    method: 'get'
  })
}
//获取基础数据（单个）
export function getEnums(dictType) {
  return request({
    url: '/system/dict/data/getDictBaseData/'+dictType,
    method: 'get'
  })
}
//获取基础数据（多个）{dictTypes}
export function getMoreEnums(dictType) {
  return request({
    url: '/system/dict/data/getDictBaseDataMore/'+dictType,
    method: 'get'
  })
}
//查看
export function getView(projectSid) {
  return request({
    url: '/module/epcproject/view/'+projectSid,
    method: 'get'
  })
}
//编辑
export function getEdit(projectSid) {
  return request({
    url: '/module/epcproject/edit/'+projectSid,
    method: 'get'
  })
}
//删除
export function delsRow(projectSid) {
  return request({
    url: '/module/epcproject/delete/'+projectSid,
    method: 'post'
  })
}
//保存 /*save--新增保存   update -- 编辑保存*/
export function saveForm(type,query) {
  let saveType = type == 'add'? 'save' : 'update';
  return request({
    url: '/module/epcproject/'+saveType,
    data:query,
    method: 'post'
  })
}
//保存项目、合同信息
export function saveProjectAndContent(project, contract) {
  return request({
    url: '/module/epcproject/saveOrUpdate',
    data:{project : JSON.stringify(project), contract :  JSON.stringify(contract)},
    method: 'post'
  })
}
//项目经理选人
export function getprojectHead() {
  return request({
    url: '/system/user/list',
    method: 'get'
  })
}
//获取项目类型级联下拉数据
export function getCascadeData(typeCode) {
  return request({
    url: '/system/cascadeData/getCascadeData/' + typeCode,
    method: 'get'
  })
}
//通过项目id查询项目组织结构
export function getorganzation(query) {
  return request({
    url: '/organization/treeSelect',
    method: 'get',
    params:query
  })
}
//新增
export function addOrganization(query) {
  return request({
    url: '/organization',
    method: 'post',
    data:query
  })
}
//新增子节点
export function getAddInfo(query) {
  return request({
    url: '/organization/getAddInfo',
    method: 'get',
    params:query
  })
}
//编辑
export function uploadOrganization(query) {
  return request({
    url: '/organization',
    method: 'put',
    data:query
  })
}
//删除
export function deleteOrganization(organzationId) {
  return request({
    url: '/organization/'+organzationId,
    method: 'delete',
  })
}
//根据id获取详情
export function getOrganizationDetailById(organzationIds) {
  return request({
    url: '/organization/'+organzationIds,
    method: 'get',
  })
}
//新增保存组织节点用户接口
export function addOrganizationUser(query) {
  return request({
    url: '/origanze/user',
    method: 'post',
    data:query
  })
}
//编辑更新组织节点用户接口
export function editOrganizationUser(query) {
  return request({
    url: '/origanze/user',
    method: 'put',
    data:query
  })
}
//根据组织节点获取用户接口
export function editOrganizationUserList(query) {
  return request({
    url: '/origanze/user/list',
    method: 'get',
    params:query
  })
}
//复制节点
export function copyOrganize(organzationId) {
  return request({
    url: '/organization/copyOrganize/'+organzationId,
    method: 'get',
  })
}

export function getInfoById(id) {
  return request({
    url: '/monthlyReport/getInfoById/'+id,
    method: 'get',
  })
}

export function saveAllData(query) {
  return request({
    url: '/monthlyReport/saveAllData',
    method: 'post',
    data:query
  })
}

export function getAddInfoOfAdd() {
  return request({
    url: '/monthlyReport/getAddInfo',
    method: 'get',
  })
}

export function getInfoBymonthly(query) {
  return request({
    url: '/monthlyReport/getInfo',//getInfoById
    method: 'get',
    params:query
  })
}

/*上传文件 项目月报和项目用印通用*/

//查月报文件夹列表
export function getMonthlyDocMenu(query) {
  return request({
    url: '/monthlyReport/getMonthlyDocMenu',
    method: 'get',
    params:query
  })
}
//根据业务类型以及关联业务id查询数据
export function getDocListByModuleAndId(query) {
  return request({
    url: '/modules/document/getDocListByModuleAndId',
    method: 'post',
    data:query
  })
}
//月报文件夹下查询列表
export function getListByParentId(parentId) {
  return request({
    url: '/modules/document/getListByParentId/'+parentId,
    method: 'get',
  })
}
//新增月报文件夹
export function addDocMenu(query) {
  return request({
    url: '/monthlyReport/addDocMenu',
    method: 'post',
    data:query
  })
}

//下载文件
export function downloadFile(query) {
  return request({
    url: '/modules/document/downloadFile',
    method: 'get',
    params:query
  })
}
//预览文档
export function onlinePreview(query) {
  return request({
    url: '/modules/document/onlinePreview',
    method: 'get',
    params:query
  })
}
//月报新增文档
export function createFile(query) {
  return request({
    url: '/modules/document/createFile',
    method: 'post',
    data:query
  })
}
//创建业务文档
export function createModuleFile(query) {
  return request({
    url: '/modules/document/createModuleFile',
    method: 'post',
    data:query
  })
}
//根据项目ID及年月查看是否有月报
export function getStateByProjectIdAndDate(query) {
  return request({
    url: '/monthlyReport/getStateByProjectIdAndDate',
    method: 'get',
    params:query
  })
}
//月报编辑文件夹
export function changeDocMenuName(query) {
  return request({
    url: '/monthlyReport/changeDocMenuName',
    method: 'post',
    data:query
  })
}
//导出
export function exportApply(query) {
  return request({
    url: '/monthlyReport/export',
    method: 'get',
    params: query
  })
}
