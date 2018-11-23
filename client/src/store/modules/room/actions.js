import * as types from '@/store/types';


const STATE_TYPE_TYPE = "me.webres.medical.roomtype";
const MEDICAL_LOG_TYPE = `${STATE_TYPE_TYPE}.medicallog`;

const TYPE_TO_MX_TYPE = {
    "medicallog": MEDICAL_LOG_TYPE,
}

const TYPE_TO_NAME = {
    "medicallog": "Medical Log",
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
            if (state.length === 0) { return; }
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
        return this.getters['auth/client'].createRoom({
            name: `Mediwatch ${TYPE_TO_NAME[data.type]}`,
            visibility: "private",
            initial_state: [{
                type: STATE_TYPE_TYPE,
                content: {
                    type: TYPE_TO_MX_TYPE[data.type]
                }
            }]
        });
    }
};
