import request from "@/utils/request";

// 查询付款信息列表
export function hotTemList(query) {
  return request({
    url: "/module/projtmpl/tmpl/list",
    method: "get",
    params: query
  });
}
// 查询付款信息列表
export function addTemplate(data) {
  return request({
    url: "/module/projtmpl/tmpl",
    method: "post",
    data
  });
}
// 查询付款信息列表
export function getTemDetail(tmplId) {
  return request({
    url: `/module/projtmpl/tmpl/${tmplId}`,
    method: "get"
  });
}
// 查询付款信息列表
export function getTemplateInit(params) {
  return request({
    url: `/module/projtmpl/tmpl/init`,
    method: "get",
    params
  });
}
// 查询付款信息列表
export function deleteTemplate(params) {
  return request({
    url: `/module/projtmpl/tmpl/${params}`,
    method: "delete"
  });
}
// 查询付款信息列表
export function modifyTempate(data) {
  return request({
    url: `/module/projtmpl/tmpl`,
    method: "put",
    data
  });
}
// 查询付款信息列表
export function hotRelative(params) {
  return request({
    url: `/module/projchance/chance/proj_chance_tmpl_list`,
    method: "get",
    params
  });
}
// 查询付款信息列表
export function relativeProject(data) {
  return request({
    url: `/module/projchance/chance/update_proj_chance_tmpl`,
    method: "POST",
    data
  });
}
