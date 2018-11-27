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
      medicalInfo: null
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
      console.log(room);
      if (rType === MEDICAL_LOG_TYPE) {
        acctRooms.medicalLog = room;
      }
      if (rType === MEDICAL_INFO_TYPE) {
        acctRooms.medicalInfo = room;
      }
    });
    commit('SET_ROOMS', acctRooms);
  },
  create({
    state,
    commit,
    dispatch
  }, data) {
    let title = (data.title) ? `Mediwatch ${data.title}` : `Mediwatch ${TYPE_TO_NAME[data.type]}`;
    return this.getters['auth/client'].createRoom({
      name: title,
      visibility: "private",
      initial_state: [{
        type: STATE_TYPE_TYPE,
        content: {
          type: TYPE_TO_MX_TYPE[data.type]
        }
      }]
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