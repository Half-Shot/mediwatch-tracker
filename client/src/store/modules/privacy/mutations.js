import * as types from "@/store/types";

export default {
  "ADD ROOM"(state, { roomid, security }) {
    console.log("Adding", roomid, "to privacy set:", security);
    state.rooms.set(roomid, security);
    let level = 2;
    state.rooms.forEach(rLevel => {
      if (rLevel < level) {
        level = rLevel;
      }
    });
    state.securityLevel = level;
  },
  "DROP ROOM"(state, roomid) {
    console.log("Dropping", roomid, "to privacy set:");
    let level = 2;
    state.rooms.delete(roomid);
    state.rooms.forEach(rLevel => {
      console.log(rLevel);
      if (rLevel < level) {
        level = rLevel;
      }
    });
    state.securityLevel = level;
  }
};
