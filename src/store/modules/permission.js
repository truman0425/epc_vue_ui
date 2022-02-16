import { constantRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'
/*import menuJson from '@/menu.json'//外部引入菜单
清空xpm+
import xpmmenuJson from '@/views/xpm/xpmmenu.json'//外部引入xpm系统的菜单

let newXpmMenu = [
  {
    "children":xpmmenuJson,
    "modName":"XPM系统菜单",
    "modSid":"other",
    "parentSid":"-1",
    "meta":{
      "icon":'monitor',
      "title":"XPM系统菜单",
    },
  }
];*/
/*清空xpm+
// 调用递归方法获得按钮数据
getTreeData(newXpmMenu,'xpm');*/

//console.log("获取重组后的xpm的菜单数据："+JSON.stringify(newXpmMenu));
/*清空xpm+*/
const permission = {
  state: {
    routes: [],
    addRoutes: [],
   /* newXpmMenu:[], */
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    /* setnewXpmMenu: (state,data) => {
       state.newXpmMenu = data
     },*/
   },
   actions: {
     // 生成路由
     GenerateRoutes({ commit }) {
       return new Promise(resolve => {
         // 向后端请求路由数据
         getRouters().then(res => {
           let allMenu = [];
           // let business = {
           //   alwaysShow: true,
           //   children: menuJson,
           //   hidden: false,
           //   meta: {
           //     icon: "system",
           //     title: "业务中心"
           //   },
           //   name: "Business",
           //   path: "/business",
           //   redirect: "noRedirect"
           // };
           //把xpm的菜单添加到聚祥云中
           /*  let xpmrouter = newXpmMenu;
           //let xpmrouter =  permission.state.newXpmMenu;
           xpmrouter.forEach((item,index) => {
             allMenu.push(item);
           }); */

           let mydata =  res.data;
           mydata.forEach((item,index) => {
             // if(index === 1){
             //   allMenu.push(business);
             // }
             allMenu.push(item);
           });

           const accessedRoutes = filterAsyncRouter(allMenu);
           accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
           commit('SET_ROUTES', accessedRoutes)
           resolve(accessedRoutes)
         })
       })
     },
     /*清空xpm+*/
     /* setnewXpmMenuaction({ commit }, data) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          let allMenu = [];

          //let xpmrouter = newXpmMenu;
          let xpmrouter =  data;
          xpmrouter.forEach((item,index) => {
            allMenu.push(item);
          });

          let mydata =  res.data;
          mydata.forEach((item,index) => {
            // if(index === 1){
            //   allMenu.push(business);
            // }
            allMenu.push(item);
          });

          const accessedRoutes = filterAsyncRouter(allMenu);
          accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        })
      })
    }, */

  }
}

/*清空xpm*/
//遍历后台返回的xpm菜单数据
/* function getTreeData(data,type) {
  // 循环遍历json数据
  for (var i = 0; i < data.length; i++) {
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
} */

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) =>  require([`@/views/${view}`], resolve)
}


export default permission
