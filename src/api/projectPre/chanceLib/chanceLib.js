import request from '@/utils/request'

/**
 * 项目机会库新增初始化参数
 * @returns {AxiosPromise}
 */
export function chanceLibInit(projId) {
  return request({
    url: `/module/projchance/chance/init?projId=${projId}`,
    method: 'get',
  })
}

/**
 * 项目机会保存
 * @param data
 * @returns {AxiosPromise}
 */
export function addChance(data) {
  return request({
    url: '/module/projchance/chance',
    method: 'post',
    data: data
  })
}

/**
 * 更新机会
 * @param data
 * @returns {AxiosPromise}
 */
export function updataChance(data) {
  return request({
    url: '/module/projchance/chance',
    method: 'put',
    data: data
  })
}

/**
 * 获取机会详情
 * @param projId
 * @returns {AxiosPromise}
 */
export function chanceDetail(projId) {
  var url = window.location.href;
  if(url.indexOf('chanceSharDetail') != -1){
    return request({
      url: `/anonymous/projchance/view_chance/${projId}`,
      method: 'get',
    })
  }else{
    return request({
      url: `/module/projchance/chance/${projId}`,
      method: 'get',
    })
  }
}

/**
 * 项目机会详情-机会跟进记录-列表
 * @param projId
 * @returns {AxiosPromise}
 */
export function chanceFollowList(projId) {

  var url = window.location.href;
  if(url.indexOf('chanceSharDetail') != -1){
    return request({
      url: `/anonymous/projchance/view_chance_follow_record/list/${projId}`,
      method: 'get',
    })
  }else{
    return request({
      url: `/module/projchance/chance/proj_chance_follow_record_list/${projId}`,
      method: 'get',
    })
  }

}


/**
 * 项目机会详情-项目机会信息
 * @param projId
 * @returns {AxiosPromise}
 */
export function chanceParticipantsList(projId) {
  return request({
    url: `/module/projchance/chance/proj_chance_participants_list/${projId}`,
    method: 'get',
  })
}

/**
 * 项目基本信息 （新接口）
 * @param projId
 * @returns {AxiosPromise}
 */
export function proj_chance_info(projId) {
  return request({
    url: `/module/projchance/chance/proj_chance_info/${projId}`,
    method: 'get',
  })
}



/**
 * 项目机会详情-客户机会信息（项目客户信息、客户行动分析、客户风险分析）
 * @param projId
 * @returns {AxiosPromise}
 */
export function chanceCustAct(projId) {
  return request({
    url: `/module/projchance/chance/proj_chance_cust_act/${projId}`,
    method: 'get',
  })
}

/**
 * 项目机会详情-需求信息
 * @param projId
 * @returns {AxiosPromise}
 */
export function chanceRfisAct(projId) {
  return request({
    url: `/module/projchance/chance/proj_chance_rfis_act/${projId}`,
    method: 'get',
  })
}

/**
 *项目机会详情-竞争对手信息
 * @param projId
 * @returns {AxiosPromise}
 */
export function chanceRfisCompetitor(projId) {
  return request({
    url: `/module/projchance/chance/proj_chance_rfis_competitor/${projId}`,
    method: 'get',
  })
}

/**
 * 项目机会详情-机会跟进记录-列表
 * @param projId
 * @returns {AxiosPromise}
 */
export function chanceFollowRecordList(data) {
  var url = window.location.href;
  if(url.indexOf('chanceSharDetail') != -1){
    return request({
      url: `/anonymous/projchance/view_chance_follow_record/list`,
      method: 'get',
      params:data,
    })
  }else{
    return request({
      url: `/module/projchance/chance/proj_chance_follow_record_list`,
      method: 'get',
      params:data,
    })
  }
}

/**
 * 机会根据组织结构
 * @param projId
 * @returns {AxiosPromise}
 */
export function chanceFollowOrgList(projId) {

  var url = window.location.href;
  if(url.indexOf('chanceSharDetail') != -1){
    return request({
      url: `/anonymous/projchance/view_chance_follow_org_list/${projId}`,
      method: 'get',
    })
  }else{
    return request({
      url: `/module/projchance/chance/proj_chance_follow_org_list/${projId}`,
      method: 'get',
    })
  }

}

/**
 * 项目机会列表
 */
export function chanceList(query) {

  return request({
    url: '/module/projchance/chance/list?',
    method: 'get',
    params: query
  })
}
/**
 * 项目机会删除
 */
export function delList(projIds) {
  return request({
    url: `/module/projchance/chance/${projIds}`,
    method: 'delete'
  })
}
/**
 * 项目机会废除
 */
export function voidProjChance(data) {
  return request({
    url: '/module/projchance/chance/void_proj_chance',
    method: 'post',
    data: data
  })
}
/**
 * 项目机会更换负责人
 */
export function updateProjUser(data) {
  return request({
    url: '/module/projchance/chance/update_proj_user',
    method: 'post',
    data: data
  })
}


////项目机会分享
/**
 *
 * 项目机会跟进分享-项目机会、项目机会分析、项目机会信息、客户机会信息、需求信息、竞争对手信息
 * @param projId
 * @returns {AxiosPromise}
 */
export function viewChance(projId) {
  debugger
  console.log('viewChance='+projId)
  return request({
    url: `/anonymous/projchance/view_chance/${projId}`,
    method: 'get',
  })
}

/**
 * 跟进记录
 * @param params
 * @returns {AxiosPromise}
 */
export function viewFollowRecord(params) {
  return request({
    url: `/anonymous/projchance/view_chance_follow_record/list`,
    method: 'get',
    params:params
  })
}

/**
 *  项目机会跟进分享-机会跟进组织人员列表
 * @param projId
 * @returns {AxiosPromise}
 */
export function viewOrgList(projId) {
  return request({
    url: `/anonymous/projchance/view_chance_follow_org_list/${projId}`,
    method: 'get',
  })
}

/**
 * 项目机会跟进分享-记录-项目机会信息查看
 * @param projId
 * @returns {AxiosPromise}
 */
export function viewProjectInfo(projId) {
  return request({
    url: `/module/projchance/chance/view_project_chance/${projId}`,
    method: 'get',
  })
}

/**
 * 项目机会跟进分享-记录-客户信息查看
 * @param flwId
 * @returns {AxiosPromise}
 */
export function viewChanceCust(flwId) {
  return request({
    url: `/anonymous/projchance/view_project_chance_cust/${flwId}`,
    method: 'get',
  })
}

/**
 * 项目机会跟进分享-记录-需求分析查看
 * @param flwId
 * @returns {AxiosPromise}
 */
export function viewChanceRfis(flwId) {
  return request({
    url: `/anonymous/projchance/view_project_chance_rfis/${flwId}`,
    method: 'get',
  })
}

/**
 * 竞争对手信息
 * @param flwId
 * @returns {AxiosPromise}
 */
export function viewChanceCompettitor(flwId) {
  return request({
    url: `/anonymous/projchance/view_proj_chance_rfis_competitor/${flwId}`,
    method: 'get',
  })
}


/**
 * 日常跟进查看
 * @param flwId
 * @returns {AxiosPromise}
 */
export function viewChanceDaily(flwId) {
  return request({
    url: `/anonymous/projchance/view_proj_chance_daily/${flwId}`,
    method: 'get',
  })
}

////分享结束

/**
 * 附件上传
 * @param query
 * @returns {AxiosPromise}
 */
export function uploadFile(query) {
  return request({
    url: '/fileservice/operating/uploadFile',
    method: 'post',
    data: query,
    headers: {
      'Content-Type': 'multipart/form-data;charse=UTF-8'
    }
  })
}

/**
 * 附件记录列表
 * @param params
 * @returns {AxiosPromise}
 */
export function fileRecoredList(params) {


  var url = window.location.href;
  if(url.indexOf('chanceSharDetail') != -1){
    return request({
      url: `/anonymous/projchance/file_record/list`,
      method: 'get',
      params:params
    })
  }else{
    return request({
      url: `/module/projchance/chance/file_record_list`,
      method: 'get',
      params:params
    })
  }

}

/**
 * 线索附件列表
 * @param params
 * @returns {AxiosPromise}
 */
export function fileRecoredClueList(params) {
  return request({
    url: `/module/projectClue/fileRecordList`,
    method: 'get',
    params:params
  })
}


export function fileLook(attachSid) {
  return request({
    url: `/common/onlinePreview?attachSid=${attachSid}`,
    method: 'get',
  })
}
