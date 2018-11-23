import * as types from '@/store/types';

export default {
  profile: (state, id) => {
    return state.profile
  },
  role: (state, id) => {
    const res = state.client.getAccountData('role');
    return !res ? null : res.event.content.role;
  },
  syncState: (state, id) => {
    return state.syncState;
  },
  client: (state, id) => {
    return state.client;
  },
};
