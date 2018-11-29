import * as types from '@/store/types';

export default {
      'SET_ROOMS' (state, roomSet) {
          console.log("Setup rooms:", roomSet);
          state.roomSet = roomSet;
      }
};
