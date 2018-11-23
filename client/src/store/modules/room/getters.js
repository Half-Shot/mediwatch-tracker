import * as types from '@/store/types';

export default {
  roomSet: state => { return state.roomSet },
  getAll: state => {
    return state.items;
  },
  get: (state, id) => {
    return state.rooms;
  },
};
