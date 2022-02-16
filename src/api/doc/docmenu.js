import request from '@/utils/request'

// 查询菜单列表
export function listDocMenu(query) {
  return request({
    url: '/doc/menu/treeselect',
    method: 'get',
    params: query
  })
}

// 查询菜单详细
export function getMenu(menuId) {
  return request({
    url: '/doc/menu/' + menuId,
    method: 'get'
  })
}

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: '/doc/menu/treeselect',
    method: 'get'
  })
}


// 新增菜单
export function addMenu(data) {
  return request({
    url: '/doc/menu',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: '/doc/menu',
    method: 'put',
    data: data
  })
}

// 删除菜单
export function delMenu(menuId) {
  return request({
    url: '/doc/menu/' + menuId,
    method: 'delete'
  })
}

//新增文档目前模板获取业务类型
export function getAddInfo(docMenuId,docMenuType) {
  return request({
    url: '/doc/menu/getAddInfo?docMenuId=' + docMenuId+'&docMenuType='+docMenuType,
    method: 'get'
  })
}

//新增文档模板
export function getAddConfig(data) {
  return request({
    url: '/doc/config',
    method: 'post',
    data:data,
  })
}
//编辑文档模板
export function getEditConfig(data) {
  return request({
    url: '/doc/config',
    method: 'put',
    data:data,
  })
}
//删除文档模板
export function delconfig(menuId) {
  return request({
    url: '/doc/config/' + menuId,
    method: 'delete'
  })
}
//文档模板列表
export function configList() {
  return request({
    url: '/doc/config/configList',
    method: 'get'
  })
}
//文档模板详情
export function configDetail(docTemplateId) {
  return request({
    url: '/doc/config/'+docTemplateId,
    method: 'get'
  })
}

//查询项目list
export function getProjectList() {
  return request({
    url: '/modules/document/getProjectList',
    method: 'get'
  })
}
//查询集团文件夹树list
export function getGroupTreeList() {
  return request({
    url: '/modules/document/getGroupTreeList',
    method: 'get'
  })
}
//查询集团文件夹详情
export function viewDocMenu(query) {
  return request({
    url: '/modules/document/viewDocMenu',
    method: 'get',
    params: query
  })
}
//新增集团文档
export function addDocMenu(query) {
  return request({
    url: '/modules/document/addDocMenu',
    method: 'post',
    data:query
  })
}
//编辑集团文档
export function editDocMenu(query) {
  return request({
    url: '/modules/document/editDocMenu',
    method: 'put',
    data:query
  })
}
//删除集团文档
export function deleteDocById(docId) {
  return request({
    url: '/modules/document/deleteById/'+docId,
    method: 'delete',
  })
}
//上下移动文档
//编辑集团文档
export function updateOrderNum(query) {
  return request({
    url: '/modules/document/updateOrderNum',
    method: 'post',
    data:query
  })
}
//查询业务类型接口
export function getGroupInfo(documentId,entityType,belongId) {
  return request({
    url: '/modules/document/getAddInfo?documentId='+documentId+'&entityType='+entityType+'&belongId='+belongId,
    method: 'get',

  })
}
//查询项目文件夹树list
export function getProjectTreeList(projectId) {
  return request({
    url: '/modules/document/getProjectTreeList/'+projectId,
    method: 'get'
  })
}
//查询公司列表及是否有文件夹
export function getCompanyList() {
  return request({
    url: '/system/dept/getCompanyList',
    method: 'get'
  })
}
//查询公司文件夹树list
export function getCompanyTreeList(query) {
  return request({
    url: '/modules/document/getCompanyTreeList/'+query,
    method: 'get',
    /*params: query*/
  })
}
//查询项目列表及是否有文件夹
export function getDocumentProjectList() {
  return request({
    url: '/module/epcproject/getDocumentProjectList',
    method: 'get'
  })
}
//模板
export function copyTemplate(query) {
  return request({
    url: '/modules/document/copyTemplate',
    method: 'get',
    params:query
  })
}
//查询公司可复制列表
export function getCopyDeptList(query) {
  return request({
    url: '/system/dept/getCopyDeptList',
    method: 'get',
    params:query
  })
}
//查询项目可复制列表
export function getCopyProjectList(query) {
  return request({
    url: '/module/epcproject/getCopyProjectList',
    method: 'get',
    params:query
  })
}
//从其他公司/项目复制菜单
export function copyMenu(query) {
  return request({
    url: '/modules/document/copyMenu',
    method: 'get',
    params:query
  })
}
//根据父级id查询子级的列表
export function getListByParentId(parentId) {
  return request({
    url: '/modules/document/getListByParentId/'+parentId,
    method: 'get',
  })
}
//重命名
export function rename(query) {
  return request({
    url: '/modules/document/rename',
    method: 'post',
    data:query
  })
}
//删除文档
export function deleteDocument(docId) {
  return request({
    url: '/modules/document/deleteById/'+docId,
    method: 'delete',
  })
}
//移动文档
export function moveDoc(query) {
  return request({
    url: '/modules/document/move',
    method: 'post',
    data:query
  })
}
//复制文档
export function copyDoc(query) {
  return request({
    url: '/modules/document/copy',
    method: 'post',
    data:query
  })
}
//新增文档
export function createFile(query) {
  return request({
    url: '/modules/document/createFile',
    method: 'post',
    data:query,
    headers: {
      'Content-Type': 'multipart/form-data;charse=UTF-8'
    }
  })
}
//文档详情信息
export function getInfo(query) {
  return request({
    url: '/modules/document/getInfo',
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
//查看评论（分页）
export function comentList(query) {
  return request({
    url: '/doc/comment/pageList',
    method: 'get',
    params:query
  })
}
//查看所有评论
export function comentAllList(query) {
  return request({
    url: '/doc/comment/list',
    method: 'get',
    params:query
  })
}
//新增评论
export function addComment(query) {
  return request({
    url: '/doc/comment/add',
    method: 'post',
    data:query
  })
}
//检测同一父级下面是否有同名文件
export function checkUniqueName(query) {
  return request({
    url: '/modules/document/checkUniqueName',
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
//获取历史版本
export function getHistoryVersion(query) {
  return request({
    url: '/modules/document/getHistoryVersion',
    method: 'get',
    params:query
  })
}
//获取分享链接
export function getSharingUrl(query) {
  return request({
    url: '/modules/document/getSharingUrl',
    method: 'get',
    params:query
  })
}
//点击分享链接
export function viewSharingUrl(query) {
  return request({
    url: '/modules/document/viewSharingUrl',
    method: 'get',
    params:query
  })
}
/*文件权限*/
//新增用户相关文档权限
export function addUserPermission(query) {
  return request({
    url: '/doc/permission/addUserPermission',
    method: 'post',
    data:query
  })
}
//编辑用户相关文档权限
export function editUserPermission(query) {
  return request({
    url: '/doc/permission/editUserPermission',
    method: 'post',
    data:query
  })
}
//查看用户相关文档权限 文档ID 文档权限类型0查看1编辑
export function getUserPermission(query) {
  return request({
    url: '/doc/permission/getUserPermission',
    method: 'get',
    params:query
  })
}

//新增角色相关文档权限
export function addRolePermission(query) {
  return request({
    url: '/doc/permission/addRolePermission',
    method: 'post',
    data:query
  })
}
//编辑角色相关文档权限
export function editRolePermission(query) {
  return request({
    url: '/doc/permission/editRolePermission',
    method: 'post',
    data:query
  })
}
//查看角色相关文档权限 文档ID 文档权限类型0查看1编辑
export function getRolePermission(query) {
  return request({
    url: '/doc/permission/getRolePermission',
    method: 'get',
    params:query
  })
}
//新增角色相关文档权限
export function addPositionPermission(query) {
  return request({
    url: '/doc/permission/addPositionPermission',
    method: 'post',
    data:query
  })
}
//编辑角色相关文档权限
export function editPositionPermission(query) {
  return request({
    url: '/doc/permission/editPositionPermission',
    method: 'post',
    data:query
  })
}
//查看角色相关文档权限
export function getPositionPermission(query) {
  return request({
    url: '/doc/permission/getPositionPermission',
    method: 'get',
    params:query
  })
}
/*个人知识库*/
//查询个人文件夹树list
export function getPersonalTreeList(query) {
  return request({
    url: '/modules/document/getPersonalTreeList',
    method: 'get',
    params:query
  })
}
//保存到个人知识库
export function saveToPersonalRepository(query) {
  return request({
    url: '/modules/document/saveToPersonalRepository',
    method: 'post',
    data:query
  })
}
//收藏到个人知识库
export function collectToPersonalRepository(query) {
  return request({
    url: '/modules/document/collectToPersonalRepository',
    method: 'get',
    params:query
  })
}
//查询我收藏的列表
export function myCollection(query) {
  return request({
    url: '/modules/document/myCollection',
    method: 'get',
  })
}
//查询我分享的列表
export function mySharing(query) {
  return request({
    url: '/modules/document/mySharing',
    method: 'get',
  })
}
//取消收藏
export function cancelPersonalCollect(query) {
  return request({
    url: '/modules/document/cancelPersonalCollect',
    method: 'get',
    params:query
  })
}
