import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const store = {

  namespaced: true,

  actions,
  getters,

  state: {
    apiStack: {
      
    }
  },

  mutations

}

export default store;