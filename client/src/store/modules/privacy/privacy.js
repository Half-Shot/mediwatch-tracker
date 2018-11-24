import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export const SECURITY_LEVELS_MAP = {
    0: "unknown",
    1: "shared",
    2: "safe"
}

const state = {
  rooms: new Map() // room_id => One of: 0-2.
};

export default {
  state,
  getters,
  actions,
  mutations
};
