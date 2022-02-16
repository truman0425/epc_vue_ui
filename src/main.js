import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

// import '@/public/static/Gooflow/fonts/iconflow.css'
// import '@/public/static/Gooflow/GooFlow.css'

// import $ from 'jquery'
// Vue.prototype.$ = $

import 'font-awesome/css/font-awesome.min.css'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import animate from 'animate.css';
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'


// import 'lib-flexible'
import '@/utils/flexible.js';


import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { parseTime, timeChange, resetForm, addDateRange, selectDictLabel, download, handleTree,getYearMonthDays } from "@/utils/ruoyi";
import Pagination from "@/components/Pagination";

import VueAnimateNumber from 'vue-animate-number';
Vue.use(VueAnimateNumber)

import cal from '@/utils/calculation';
Vue.prototype.cal = cal

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.timeChange = timeChange
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.getYearMonthDays = getYearMonthDays
Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}
//警告提示窗
Vue.prototype.msgWarning = function (msg) {
  this.$message({ showClose: true, message: msg, type: "warning" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}
// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.use(permission)

import myTable from "@/views/components/baseInfo/my-table";
Vue.component('my-table', myTable)

//弹窗
import MyDialog from "@/views/components/baseInfo/my-dialog";
Vue.component('my-dialog', MyDialog)

import TableSearchItem from "@/views/components/baseInfo/table-search-item";
Vue.component('table-search-item', TableSearchItem)
//选人
import PubliceSelectUser from "@/views/components/baseInfo/publice-select-user";
Vue.component('publice-select-user', PubliceSelectUser)

import CollapseItem from "@/views/components/baseInfo/collapse-item";
Vue.component('collapse-item', CollapseItem)



//保存成功提示框
import dialogSaveSucess from "@/views/components/baseInfo/dialog-save-sucess";
Vue.component('dialog-save-sucess', dialogSaveSucess)

import dialogSaveWarn from "@/views/components/baseInfo/dialog-save-warn";
Vue.component('dialog-save-warn', dialogSaveWarn)


//列表删除提示框
import dialogTableDel from "@/views/components/baseInfo/dialog-table-del";
Vue.component('dialog-table-del', dialogTableDel)

//选部门
import PubliceSelectDept from "@/views/components/baseInfo/publice-select-dept";
Vue.component('publice-select-dept', PubliceSelectDept)

//审批状态
import stateList from '@/views/components/stateList/index'
Vue.component('state-list', stateList)


//自定义扩展字段
import MetaFieldList from "@/views/business/meta/components/meta-field-list";
Vue.component('meta-field-list', MetaFieldList)

//自定义扩展字段详情
import MetaFieldDetail from "@/views/business/meta/components/meta-field-detail";
Vue.component('meta-field-detail', MetaFieldDetail)

import Bus from '@/utils/eventBus.js'
Bus(Vue)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
/*无限滚动 无限滚动*/
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll);
//el-select引入滚动条监控
Vue.directive('loadmore', {
  bind (el, binding) {
    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    SELECTWRAP_DOM.addEventListener('scroll', function () {
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (CONDITION) {
        binding.value()
      }
    })
  }
})

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false






new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

