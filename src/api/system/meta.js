import request from '@/utils/request'

//查询元数据配置
export function getxItemlist(query) {
  return request({
    url: '/system/xItem/list',
    method: 'get',
    params:query
  })
}
//查询元数据关联业务接口
export function getAddInfo() {
  return request({
    url: '/system/xItem/getAddInfo',
    method: 'get',
  })
}
//查询元数据字段类型接口
export function getxItemtype() {
  return request({
    url: '/system/xItem/type',
    method: 'get',
  })
}
//查询元数据字段类型接口
export function getxItemtypeById(query) {
  return request({
    url: '/system/xItem/type',
    method: 'get',
    params:query
  })
}
//元数据适配业务示例(新增)
export function queryaddepcproject() {
  return request({
    url: '/module/epcproject/add',
    method: 'get',
  })
}
//查询元数据适配业务示例(编辑)
export function queryeditepcproject(projectSid) {
  return request({
    url: '/module/epcproject/edit/'+projectSid,
    method: 'get',
  })
}
//查询元数据关联业务接口
export function savexItemData(query) {
  return request({
    url: '/system/xItem/saveXitemData',
    method: 'post',
    data:query,
  })
}
//查询元数据
export function getInfoById(xItemId) {
  return request({
    url: '/system/xItem/'+xItemId,
    method: 'get',
  })
}
//新增元数据
export function addxItem(query) {
  return request({
    url: '/system/xItem/add',
    method: 'post',
    data:query
  })
}
//编辑元数据
export function editxItem(query) {
  return request({
    url: '/system/xItem/edit',
    method: 'post',
    data: query
  })
}
//删除元数据
export function delxItem(xItemId) {
  return request({
    url: '/system/xItem/remove/' + xItemId,
    method: 'delete'
  })
}

/**
 * 获取扩展字段列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getItemDataList(query) {
  return request({
    url: '/system/xItem/itemDataList',
    method: 'get',
    params:query
  })
}

