import * as types from "@/store/types";

import { SECURITY_LEVELS_MAP } from "./privacy";

export default {
  // Fire this when we show a new room to the user.
  showingRoom({ state, commit, dispatch }, room) {
    console.log("Showing room", room);
    // We want to determine how secure this room really is and we can do that by:
    // Checking the memberlist.
    if (room.currentState.getMembers().length < 2) {
      // We are the only ones in it. We can call this safe.
      return;
    }
    // We have more than one user in this room.
    commit("ADD ROOM", { roomid: room.roomId, security: 1 });
  },
  // Fire this when the room is being unloaded.
  hidingRoom({ state, commit, dispatch }, room) {
    console.log("Hiding room", room);
    commit("DROP ROOM", room.roomId);
  }
};
