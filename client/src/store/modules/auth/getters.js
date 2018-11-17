import * as types from '@/store/types';

export default {
  getAll: state => {
    return state.items
  },
  profile: (state, id) => {
    return state.profile
  },
};
