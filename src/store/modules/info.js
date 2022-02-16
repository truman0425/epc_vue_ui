
const state = {
  infotagIndex: '',

}

const mutations = {
  settInfotagIndex: (state,data) => {
    state.infotagIndex = data
  },

}

const actions = {
  settInfotagIndexaction({ commit }, data) {
    commit('settInfotagIndex', data)
  },

}

export default {
  state,
  mutations,
  actions
}
