import * as types from '@/store/types';

export default {
  profile: (state, id) => {
    return state.profile
  },
  role: (state, id) => {
    return state.role;
  },
  userId: (state, id) => {
    return state.mx_userId;
  },
  syncState: (state, id) => {
    return state.syncState;
  },
  client: (state, id) => {
    return state.client;
  },
};
