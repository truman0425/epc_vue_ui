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
  return request({
    url: '/module/epcproject/projectList',
    method: 'post',
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
    url: '/system/dict/data/getDictBaseData/' + dictType,
    method: 'get'
  })
}

//获取基础数据（多个）{dictTypes}
export function getMoreEnums(dictType) {

  var url = window.location.href;
  if(url.indexOf('chanceSharDetail') != -1){
    return request({
      url: '/anonymous/dict/data/getDictBaseDataMore/' + dictType,
      method: 'get'
    })
  }else{
    return request({
      url: '/system/dict/data/getDictBaseDataMore/' + dictType,
      method: 'get'
    })
  }

}

//查看
export function getView(projectSid) {
  return request({
    url: '/module/epcproject/view/' + projectSid,
    method: 'get'
  })
}

//编辑
export function getEdit(projectSid) {
  return request({
    url: '/module/epcproject/edit/' + projectSid,
    method: 'get'
  })
}

//删除
export function delsRow(projectSid) {
  return request({
    url: '/module/epcproject/delete/' + projectSid,
    method: 'post'
  })
}

//保存 /*save--新增保存   update -- 编辑保存*/
export function saveForm(type, query) {
  let saveType = type == 'add' ? 'save' : 'update';
  return request({
    url: '/module/epcproject/' + saveType,
    data: query,
    method: 'post'
  })
}

//保存项目、合同信息
export function saveProjectAndContent(project, contract) {
  return request({
    url: '/module/epcproject/saveOrUpdate',
    data: {project: JSON.stringify(project), contract: JSON.stringify(contract)},
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
    params: query
  })
}

//新增
export function addOrganization(query) {
  return request({
    url: '/organization',
    method: 'post',
    data: query
  })
}

//新增子节点
export function getAddInfo(query) {
  return request({
    url: '/organization/getAddInfo',
    method: 'get',
    params: query
  })
}

//编辑
export function uploadOrganization(query) {
  return request({
    url: '/organization',
    method: 'put',
    data: query
  })
}

//删除
export function deleteOrganization(organzationId) {
  return request({
    url: '/organization/' + organzationId,
    method: 'delete',
  })
}

//根据id获取详情
export function getOrganizationDetailById(organzationIds) {
  return request({
    url: '/organization/' + organzationIds,
    method: 'get',
  })
}

//新增保存组织节点用户接口
export function addOrganizationUser(query) {
  return request({
    url: '/origanze/user',
    method: 'post',
    data: query
  })
}

//编辑更新组织节点用户接口
export function editOrganizationUser(query) {
  return request({
    url: '/origanze/user',
    method: 'put',
    data: query
  })
}

//根据组织节点获取用户接口
export function editOrganizationUserList(query) {
  return request({
    url: '/origanze/user/list',
    method: 'get',
    params: query
  })
}

//复制节点
export function copyOrganize(organzationId) {
  return request({
    url: '/organization/copyOrganize/' + organzationId,
    method: 'get',
  })
}

/*项目立项列表*/
export function showDepart(query) {
  return request({
    url: '/system/ocx/showDepart',
    method: 'get',
    params: query
  })
}


///////////////////新添加的接口/////////////

/**
 * 项目立项列表
 * @param query
 * @returns {AxiosPromise}
 */
export function establishList(query) {
  return request({
    url: '/module/project/establish/list',
    method: 'get',
    params: query
  })
}


/**
 * 项目立项详情
 * @param projectSid 项目立项id
 * @returns {AxiosPromise}
 */
export function establishDetail(projectSid) {
  return request({
    url: '/module/project/establish/getInfo?projectSid=' + projectSid,
    method: 'get',
  })
}

/**
 * 项目分项 根据 sid 获取 epcprojectsub 表中数据
 * @param projectSid
 * @returns {AxiosPromise}
 */
export function getProjectSubBySid(params) {
  return request({
    url: '/module/projectSub/getProjectSubBySid',
    method: 'get',
    params: params
  })
}

/**
 * 获取分项数据数据
 * @param params
 * @returns {AxiosPromise}
 */
export function getSubNumDataListBySid(params){
  return request({
    url: '/module/projectSub/getSubNumDataListBySid',
    method: 'get',
    params: params
  })
}

export function establishDetail2(query) {
  return request({
    url: '/module/project/establish/getInfo',
    method: 'get',
    params: query
  })
}


/**
 * 附件列表
 * @param query
 * @returns {AxiosPromise}
 */
export function establishFilelist(query) {
  return request({
    url: '/module/project/establish/filelist',
    method: 'get',
    params: query
  })
}

/**
 * 附件下载
 * @param fileId
 * @returns {AxiosPromise}
 */
export function downloadFile(attachSid) {
  return request({
    url: '/module/project/establish/download/' + attachSid,
    method: 'get',
  })
}


/**
 * 项目新增
 * @param query
 * @returns {AxiosPromise}
 */
export function establishAdd(query) {
  return request({
    url: '/module/project/establish',
    method: 'post',
    data: query
  })
}


/**
 * 项目编辑
 * @param query
 * @returns {AxiosPromise}
 */
export function establishEdit(query) {
  return request({
    url: '/module/project/establish',
    method: 'put',
    data: query
  })
}

/**
 * 项目删除
 * @param organzationId
 * @returns {AxiosPromise}
 */
export function deleteEstablish(organzationId) {
  return request({
    url: '/module/project/establish/' + organzationId,
    method: 'delete',
  })
}


/**
 * 资质人员列表
 * @param query
 * @returns {AxiosPromise}
 */
export function qualificationslist(query) {
  return request({
    url: '/module/project/establish/qualificationslist',
    method: 'get',
    params: query
  })
}

/**
 * 业主名称列表（合作单位）
 * @param query
 * @returns {AxiosPromise}
 */
export function deptList(query) {
  return request({
    url: '/module/basic/dept/list',
    method: 'get',
    params: query
  })
}


/**
 * 前期项目列表
 * @param query
 * @returns {AxiosPromise}
 */
export function priorprojectlist(query) {
  return request({
    url: '/module/project/establish/priorprojectlist',
    method: 'get',
    params: query
  })
}

/**
 * 获取地区列表
 * @returns {AxiosPromise}
 */
export function arealist() {
  return request({
    url: '/module/project/establish/arealist',
    method: 'get',
  })
}

// /**
//  * 5.16	项目类型与行业类型列表
//  * @param peojectType
//  * 项目类型级联数据：project_type_dzy
//    行业类型级联数据：project_type_industry
//  * @returns {AxiosPromise}
//  */
// export function getCascadeData(peojectType) {
//   return request({
//     url: '/system/cascadeData/getCascadeData/'+peojectType,
//     method: 'get',
//   })
// }


export function uploadFile(query) {
  return request({
    url: '/module/project/establish/uploadFile',
    method: 'post',
    data: query,
    headers: {
      'Content-Type': 'multipart/form-data;charse=UTF-8'
    }
  })
}

export function uploadSubItemFile(query) {
  return request({
    url: '/module/projectsub/projectsub/uploadFile',
    method: 'post',
    data: query,
    headers: {
      'Content-Type': 'multipart/form-data;charse=UTF-8'
    }
  })
}

/**
 * 文件导出
 * @returns {AxiosPromise}
 */
export function exportFile(query) {
  return request({
    url: '/module/project/establish/export',
    method: 'get',
    params: query
  })
}

/**
 * 资质人员列表
 * @param query
 * @returns {AxiosPromise}
 */
// export function qualificationslist(query) {
//   return request({
//     url: '/module/project/establish/qualificationslist',
//     method: 'get',
//     params: query
//   })
// }

/*
* 项目分项新增弹框查询功能
* */
export function getProjectItemPop(query) {
  return request({
    url: '/module/project/establish/getProjectItemPop',
    method: 'get',
    params: query
  })
}

/**
 * 项目分项列表
 * @param params
 * @returns {AxiosPromise}
 */
export function projectSubList(params){
  return request({
    url: '/module/projectSub/getProjectSubList',
    method: 'get',
    params: params
  })
}

/**
 * 项目分项保存基本信息
 * @param query
 * @returns {AxiosPromise}
 */
export function saveEpcProjectSub(params) {
  return request({
    url: '/module/projectSub/saveEpcProjectSub',
    method: 'post',
    data: params
  })
}

/**
 * 项目分项保存分项信息
 * @param query
 * @returns {AxiosPromise}
 */
export function saveEpcProjectSubNum(params) {
  return request({
    url: '/module/projectSub/saveEpcProjectSubNum',
    method: 'post',
    data: params
  })
}

/**delete
 * 删除 项目分项 数据
 * @param projectSid
 * @returns {AxiosPromise}
 */
export function delProjectSubRows(params) {
  return request({
    url: '/module/projectSub/delEpcProjectSubBySid',
    method: 'delete',
    params: params
  })
}


