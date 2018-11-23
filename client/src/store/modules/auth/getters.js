import * as types from '@/store/types';

export default {
  getAll: state => {
    return state.items
  },
  profile: (state, id) => {
    return state.profile
  },
  role: (state, id) => {
    return state.role
  },
  syncState: (state, id) => {
    return state.syncState;
  },
};
