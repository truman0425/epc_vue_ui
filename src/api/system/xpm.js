import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

//获取用户部门
export function showDepart(query) {
  return request({
    url: '/system/ocx/showDepart',
    method: 'get',
    params:query
  })
}
//获取用户菜单
export function showModules(data) {
  return request({
    url: '/system/ocx/showModules',
    method: 'post',
    data: data
  })
}
//获取用户OCXConn
export function getXpm() {
  return request({
    url: '/system/ocx/getOCXConn',
    method: 'get',
  })
}
