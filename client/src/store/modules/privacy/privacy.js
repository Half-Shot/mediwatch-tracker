import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  rooms: [

  ],
  securityLevel: "safe" // One of: "safe", "shared", "unknown"
};

export default {
  state,
  getters,
  actions,
  mutations
};
