import request from '@/utils/request'

/**
 * 项目机会信息初始数据
 * @returns {AxiosPromise}
 */
export function chanceFollowUpInit(projId) {
  return request({
    url: `/module/projchance/chance/init_project_chance?projId=${projId}`,
    method: 'get',
  })
}

/**
 * 项目机会跟进保存
 * @param data
 * @returns {AxiosPromise}
 */
export function saveFollowUpChance(data) {
  return request({
    url: '/module/projchance/chance/edit_project_chance',
    method: 'put',
    data: data
  })
}

/**
 *  项目机会跟进-客户信息初始数据
 * @returns {AxiosPromise}
 */
export function chanceCustInit(projId) {
  return request({
    url: `/module/projchance/chance/init_project_chance_cust?projId=${projId}`,
    method: 'get',
  })
}

/**
 * 保存跟进客户信息
 * @param data
 * @returns {AxiosPromise}
 */
export function saveCustFollowUpChance(data) {
  return request({
    url: '/module/projchance/chance/edit_project_chance_cust',
    method: 'put',
    data: data
  })
}


/**
 *  需求信息初始化
 * @returns {AxiosPromise}
 */
export function chanceRfisInit(projId) {
  return request({
    url: `/module/projchance/chance/init_project_chance_rfis?projId=${projId}`,
    method: 'get',
  })
}

/**
 * 需求分析保存
 * @param data
 * @returns {AxiosPromise}
 */
export function saveRefisFollowUpChance(data) {
  return request({
    url: '/module/projchance/chance/edit_project_chance_rfis',
    method: 'put',
    data: data
  })
}


/**
 *  项目机会详情-竞争对手分析初始数据
 * @returns {AxiosPromise}
 */
export function chanceCompetitorInit(projId) {
  return request({
    url: `/module/projchance/chance/init_proj_chance_rfis_competitor?projId=${projId}`,
    method: 'get',
  })
}

/**
 * 竞争对手分析保存
 * @param data
 * @returns {AxiosPromise}
 */
export function saveCompetitorFollowUpChance(data) {
  return request({
    url: '/module/projchance/chance/edit_project_chance_competitor',
    method: 'put',
    data: data
  })
}


/**
 *  项目机会详情-日常跟进初始数据
 * @returns {AxiosPromise}
 */
export function chanceDailyInit(projId) {
  return request({
    url: `/module/projchance/chance/init_proj_chance_daily?projId=${projId}`,
    method: 'get',
  })
}

/**
 * 日常跟进保存
 * @param data
 * @returns {AxiosPromise}
 */
export function saveDailyFollowUpChance(data) {
  return request({
    url: '/module/projchance/chance/edit_project_chance_daily',
    method: 'put',
    data: data
  })
}


//查看

/**
 *  项目机会详情
 * @returns {AxiosPromise}
 */
export function chanceInfoDetail(projId) {
  let url = window.location.href;
  if(url.indexOf('chanceSharDetail') != -1){
    return request({
      url: `/anonymous/projchance/view_project_chance/${projId}`,
      method: 'get',
    })
  }else{
    return request({
      url: `/module/projchance/chance/view_project_chance/${projId}`,
      method: 'get',
    })
  }

}

/**
 *  项目机会客户详情
 * @returns {AxiosPromise}
 */
export function chanceCustDetail(projId) {
  let url = window.location.href;
  if(url.indexOf('chanceSharDetail') != -1){
    return request({
      url: `/anonymous/projchance/view_project_chance_cust/${projId}`,
      method: 'get',
    })
  }else{
    return request({
      url: `/module/projchance/chance/view_project_chance_cust/${projId}`,
      method: 'get',
    })
  }

}

/**
 * 项目机会跟进记录-需求分析查看
 * @param projId
 * @returns {AxiosPromise}
 */
export function chanceRfisDetail(projId) {
  let url = window.location.href;
  if(url.indexOf('chanceSharDetail') != -1){
    return request({
      url: `/anonymous/projchance/view_project_chance_rfis/${projId}`,
      method: 'get',
    })
  }else{
    return request({
      url: `/module/projchance/chance/view_project_chance_rfis/${projId}`,
      method: 'get',
    })
  }

}


/**
 * 项目机会跟进记录-日常跟进查看
 * @param projId
 * @returns {AxiosPromise}
 */
export function chanceDailyDetail(projId) {
  let url = window.location.href;
  if(url.indexOf('chanceSharDetail') != -1){
    return request({
      url: `/anonymous/projchance/view_proj_chance_daily/${projId}`,
      method: 'get',
    })
  }else{
    return request({
      url: `/module/projchance/chance/view_proj_chance_daily/${projId}`,
      method: 'get',
    })
  }

}


/**
 * 项目机会跟进记录-竞争对手分析
 * @param projId
 * @returns {AxiosPromise}
 */
export function chanceCompetitorDetail(projId) {
  let url = window.location.href;
  if(url.indexOf('chanceSharDetail') != -1){
    return request({
      url: `/anonymous/projchance/view_proj_chance_rfis_competitor/${projId}`,
      method: 'get',
    })
  }else{
    return request({
      url: `/module/projchance/chance/view_proj_chance_rfis_competitor/${projId}`,
      method: 'get',
    })
  }

}

/**
 * 评论或回复
 * @param data
 * @returns {AxiosPromise}
 */
export function addFollowComment(data) {
  return request({
    url: '/module/projchance/chance/add_project_chance_follow_comment',
    method: 'post',
    data: data
  })
}

/**
 * 删除评论
 * @param cmtId
 * @returns {AxiosPromise}
 */
export function removeFollowComment(cmtId) {
  return request({
    url: `/module/projchance/chance/remove_project_chance_follow_comment/${cmtId}`,
    method: 'DELETE',
  })
}


/**
 * 添加组织成员
 * @param data
 * @returns {AxiosPromise}
 */
export function addFollowOrg(data) {
  return request({
    url: '/module/projchance/chance/add_follow_org',
    method: 'post',
    data: data
  })
}

/**
 * 移除人员
 * @param projId
 * @returns {AxiosPromise}
 */
export function removeFollowOrg(projId) {
  return request({
    url: `/module/projchance/chance/remove_follow_org/${projId}`,
    method: 'DELETE',
  })
}



