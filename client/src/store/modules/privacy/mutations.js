import * as types from '@/store/types';

export default {
  'ADD ROOM' (state, {roomid, security}) {
    console.log(roomid, security);
    state.rooms.set(roomid, security);
    let level = 2;
    state.rooms.forEach((rLevel) => {
        console.log(rLevel);
        if (rLevel < level) { level = rLevel; }
    });
  },
  'DROP ROOM'(state, roomid) {
    let level = 2;
    state.rooms.delete(roomid);
    state.rooms.forEach((rLevel) => {
        console.log(rLevel);
        if (rLevel < level) { level = rLevel; }
    });
    state.securityLevel = level;
  },
};
