import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import settings from './modules/settings'
import getters from './getters'
import xpm from './modules/xpm'
import info from './modules/info'

Vue.use(Vuex)
var store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    permission,
    settings,
    xpm,
    info,
  },
  getters,

})

export default store
