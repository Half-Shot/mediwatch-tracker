import * as types from '@/store/types';


const STATE_TYPE_TYPE = "me.webres.medical.roomtype";
const MEDICAL_LOG_TYPE = `${STATE_TYPE_TYPE}.medicallog`;
const MEDICAL_INFO_TYPE = `${STATE_TYPE_TYPE}.medicalInfo`;

const TYPE_TO_MX_TYPE = {
  "medicallog": MEDICAL_LOG_TYPE,
  "medicalInfo": MEDICAL_INFO_TYPE,
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
      medicalInfo: null,
    };
    const patients = {

    };
    console.log("Fetching rooms");
    const ourName = this.getters['auth/client'].getUserId();
    this.getters['auth/client'].getRooms().forEach((room) => {
      // Creator
      const creatorState = room.currentState.getStateEvents("m.room.create");
      if (creatorState.length !== 1) {
          return;
      }
      const creatorUser = creatorState[0].getContent().creator;
      const state = room.currentState.getStateEvents(STATE_TYPE_TYPE);
      if (state.length === 0) {
        return;
      }
      if (state.length > 1) {
        console.warn(`${room.roomId} has multiple roomtypes, eek`);
      }
      const rType = state[0].getContent().type;
      if (creatorUser === ourName) {
        if (rType === MEDICAL_LOG_TYPE) {
            acctRooms.medicalLog = room;
          }
          if (rType === MEDICAL_INFO_TYPE) {
            acctRooms.medicalInfo = room;
          }
      } else {
        const patientUser = patients[creatorUser] || {};
        if (rType === MEDICAL_LOG_TYPE) {
            patientUser.medicalLog = room;
          }
          if (rType === MEDICAL_INFO_TYPE) {
            patientUser.medicalInfo = room;
          }
        patients[creatorUser] = patientUser;
      }
      console.log(`Found ${room.roomId} (${rType})`);
    });
    commit('SET_ROOMS', acctRooms);
    commit('SET_PATIENT_ROOMS', patients);
  },
  create({
    state,
    commit,
    dispatch
  }, data) {
    const userId = this.getters['auth/client'].getUserId();
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
  invite({
    state,
    commit,
    dispatch
  }, {
    room,
    user
  }) {
    return this.getters['auth/client'].invite(room.roomId, user);
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