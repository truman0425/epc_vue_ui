import request from '@/utils/request'

// 查询付款信息列表
export function listAccount(query) {
  return request({
    url: '/module/basic/payInfo/list',
    method: 'get',
    params: query
  })
}

// 查询付款详情
export function detailAccount(query) {
    return request({
        url: '/module/basic/payInfo/getInfo',
        method: 'get',
        params: query
    })
}

// 新增付款信息
export function addAccount(data) {
    return request({
      url: '/module/basic/payInfo/add',
      method: 'post',
      data: data
    })
}

// 修改付款信息
export function updateAccount(data) {
    return request({
        url: '/module/basic/payInfo/edit',
        method: 'put',
        data: data
    })
}

// 删除付款信息
export function deleteAccount(payId) {
    return request({
        url: `/module/basic/payInfo/${payId}`,
        method: 'delete',
    })
}

// 导入付款信息
export function importAccount(data) {
    return request({
        url: '/module/basic/payInfo/importData',
        method: 'post',
        data: data
    })
}

// 导出付款信息
export function exportAccount(data) {
    return request({
        url: '/module/basic/payInfo/export',
        method: 'post',
        data: data
    })
}


