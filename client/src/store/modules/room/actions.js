import * as types from '@/store/types';


const STATE_TYPE_TYPE = "me.webres.medical.roomtype";
const MEDICAL_LOG_TYPE = `${STATE_TYPE_TYPE}.medicallog`;
const MEDICAL_INFO_TYPE = `${STATE_TYPE_TYPE}.medicalInfo`;

const TYPE_TO_MX_TYPE = {
  "medicallog": MEDICAL_LOG_TYPE,
}

const TYPE_TO_NAME = {
  "medicallog": "Medical Log",
  "medicalInfo": "Medical Information"
}

export default {
  fetchRooms({
    state,
    commit,
    dispatch
  }, data) {
    const acctRooms = {
      medicalLog: null,
    };
    console.log("Fetching rooms");
    this.getters['auth/client'].getRooms().forEach((room) => {
      const state = room.currentState.getStateEvents(STATE_TYPE_TYPE);
      if (state.length === 0) {
        return;
      }
      if (state.length > 1) {
        console.warn(`${room.roomId} has multiple roomtypes, eek`);
      }
      const rType = state[0].getContent().type;
      if (rType === MEDICAL_LOG_TYPE) {
        acctRooms.medicalLog = room;
      }
    });
    commit('SET_ROOMS', acctRooms);
  },
  create({
    state,
    commit,
    dispatch
  }, data) {
    const userId = this.getters['auth/client'].getUserId;
    const users = {};
    users[userId] = 100;
    return this.getters['auth/client'].createRoom({
      name: `Mediwatch ${TYPE_TO_NAME[data.type]}`,
      visibility: "private",
      initial_state: [{
          type: STATE_TYPE_TYPE,
          content: {
            type: TYPE_TO_MX_TYPE[data.type]
          },
        },
        {
          type: "m.room.power_levels",
          content: {
            users,
            "users_default": 0,
            "events": {
              "m.room.name": 50,
              "m.room.power_levels": 100,
              "m.room.history_visibility": 100,
              "m.room.canonical_alias": 100,
              "m.room.avatar": 100
            },
            "events_default": 50,
            "state_default": 50,
            "ban": 100,
            "kick": 100,
            "redact": 100,
            "invite": 100
          },
        }
      ]
    });
  },
  addToLog({
    state,
    commit,
    dispatch
  }, {
    room,
    body
  }) {
    return this.getters['auth/client'].sendTextMessage(
      room.roomId,
      body,
    );
  },
};