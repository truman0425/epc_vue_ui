
const state = {
  level: {},
  userxpmInfo:{},
  xpmData:{},
  leveloptions:[],
  xpmmenuJson:[],
}

const mutations = {
  setLevel: (state,data) => {
    state.level = data
  },
  setUserxpmInfo: (state,data) => {
    state.userxpmInfo = data
  },
  setXpmData: (state,data) => {
    state.xpmData = data
  },
  setLeveloptions: (state,data) => {
    state.leveloptions = data
  },
  setXpmmenuJson: (state,data) => {
    state.xpmmenuJson = data
  },
}

const actions = {
  setLevelaction({ commit }, data) {
    commit('setLevel', data)
  },
  setUserxpmInfoaction({ commit }, data) {
    commit('setUserxpmInfo', data)
  },
  setXpmDataaction({ commit }, data) {
    commit('setXpmData', data)
  },
  setLeveloptionsaction({ commit }, data) {
    commit('setLeveloptions', data)
  },
  setXpmmenuaction({ commit }, data) {
    commit('setXpmmenuJson', data)
  },
}

export default {
  state,
  mutations,
  actions
}
