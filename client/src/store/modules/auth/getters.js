import * as types from '@/store/types';

export default {
  profile: (state, id) => {
    return state.profile
  },
  role: (state, id) => {
    return state.role;
  },
  syncState: (state, id) => {
    return state.syncState;
  },
  client: (state, id) => {
    return state.client;
  },
};
