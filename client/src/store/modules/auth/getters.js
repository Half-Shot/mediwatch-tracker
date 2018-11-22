import * as types from '@/store/types';

export default {
  getAll: state => {
    return state.items
  },
  profile: (state, id) => {
    return state.profile
  },
  syncState: (state, id) => {
    return state.client === null ? null : state.client.syncState;
  },
};
