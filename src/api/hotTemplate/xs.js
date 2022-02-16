import request from "@/utils/request";

export function projectClueAdd(data) {
    return request({
        url: "/module/projectClue/projectClueAdd",
        method: 'post',
        data
   })
}

export function projectClue(data) {
    return request({
        url: "/module/projectClue/projectClue/list",
        method: 'get',
        data
   })
}
export function projectCluepent(projectSid) {
    return request({
        url: "/module/projectClue/"+projectSid,
        method: "DELETE",
        
    })
}