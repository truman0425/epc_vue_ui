import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

import {showDepart,showModules,getXpm} from "@/api/system/xpm";

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register','/chanceSharDetail']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {

        //拉取ocx接口信息
        //使用接口获取动态码
        /* getXpm().then(response => {
          let msg = response.msg;
          let userxpmInfo = JSON.parse(msg);
          store.commit('setXpmData',userxpmInfo);

          if(userxpmInfo){
            store.commit('setUserxpmInfo', userxpmInfo);
            //获取ocx userId
            let userId = userxpmInfo.user_sid;
            let params = {};
            params["userId"] = userId;
            showDepart(params).then(response => {

              //获取xpm部门
              let leveloptions = response.data;
              let treelevelList = arrayTOTree(leveloptions)|| [];
               store.commit('setLeveloptions',JSON.parse(JSON.stringify(treelevelList)));
              //获取初始化层级
              let levelstorage = localStorage.getItem("Level");
              if(levelstorage){
               // store.commit('setLevel',JSON.parse(levelstorage));
              }else{

                if(treelevelList && treelevelList.length>0){
                  let initxpmlevelItem = treelevelList[0];
                  store.commit('setLevel',initxpmlevelItem);
                  localStorage.setItem('Level',JSON.stringify(initxpmlevelItem));
                }


              }




              // 判断当前用户是否已拉取完user_info信息
              store.dispatch('GetInfo').then(res => {
                // 拉取user_info
                const roles = res.roles;

                store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
                  // 测试 默认静态页面
                  // store.dispatch('permission/generateRoutes', { roles }).then(accessRoutes => {
                  // 根据roles权限生成可访问的路由表
                  router.addRoutes(accessRoutes) // 动态添加可访问路由表
                  next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
                })

              })
                .catch(err => {
                  store.dispatch('FedLogOut').then(() => {
                    Message.error(err)
                    next({ path: '/' })
                  })
                })
              // 判断当前用户是否已拉取完user_info信息

            }).catch(response => {
              console.log("没有查询到相关xpm部门信息");
            });

          }else{
            console.log("没有查询到相关xpm登录信息");
          }

        }); */

        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => {
          // 拉取user_info
          const roles = res.roles;

          store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
            // 测试 默认静态页面
            // store.dispatch('permission/generateRoutes', { roles }).then(accessRoutes => {
            // 根据roles权限生成可访问的路由表
            router.addRoutes(accessRoutes) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })

        })
          .catch(err => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err)
              next({ path: '/' })
            })
          })


      } else {
        next()
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // if (hasPermission(store.getters.roles, to.meta.roles)) {
        //   next()
        // } else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true }})
        // }
        // 可删 ↑
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      //清空xpm层级缓存
      localStorage.removeItem("Level");
      localStorage.removeItem("isChangeLevel");
      // next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      next(`/login`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})
function arrayTOTree(list){
  const map = list.reduce((res,v)=>{
    res[v.id] = v;
    return res;
  },{})
  const res = [];
  for(let item of list){
    if(item._parentId === ''){
      res.push(item);
      continue;
    }
    if(item._parentId in map){
      const parent = map[item._parentId];
      parent.children = parent.children || [];
      parent.children.push(item);
    }
  }
  return res;
}

/*  function getTreeData(data,type) {
// 循环遍历json数据
for (var i = 0; i < data.length; i++) {
  if(!data[i].children || data[i].children == null){
    data[i].children = [];
  }else{

  }
  //如果是xpm系统首页首页
  if(data[i].modSid=='homepage'){
    data[i].path = 'xpmhome';
    data[i].component = '';
  }else{
    data[i].path = data[i].modSid;
  }
  data[i].name = data[i].modName;
  if(!data[i].meta){
    data[i].meta = {
      icon:'ZZZZ',
      title:data[i].name,};
  }
  data[i].type = "xpm";
  if (data[i].component) {
    // Layout组件特殊处理
    if (data[i].component === 'Layout') {
      data[i].component = Layout
    } else {
      data[i].component = loadView(data[i].component)
    }
  }else{
    data[i].component = 'Layout';
  }

  if (data[i].children.length < 1) {
    // children若为空数组，则将children设为undefined
    data[i].children = [];
  } else {
    // children若不为空数组，则继续 递归调用 本方法
    getTreeData(data[i].children,data[i].modSid);
  }
}
return data;
}; */

router.afterEach(() => {
  NProgress.done()
})
