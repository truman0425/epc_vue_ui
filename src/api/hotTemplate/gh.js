import request from "@/utils/request";

export  function clueAdd(data) {
    return request({
        url: '/module/projectClue/clueAdd',
        method:'POST',
        data
    })
}
export function projectCluelist(param) {
    return request({
        url: '/module/projectClue/'+param,
        method: 'get',
        // param:param
     })
}
export function clueEdit(data) {
    return request({
        url: '/module/projectClue/clueEdit',
        method: 'put',
        data
        // param:param
     })
}