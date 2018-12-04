import * as types from "@/store/types";

export default {
  SET_ROOMS(state, roomSet) {
    console.log("Setup rooms:", roomSet);
    state.roomSet = roomSet;
  },
  SET_INVITES(state, invites) {
    state.invites = invites;
  },
  SET_PATIENT_LIST(state, patientList) {
    state.patientList = patientList;
  },
  SET_PATIENT_ROOMS(state, patientRooms) {
    console.log("Setup patient rooms-->", patientRooms);
    state.patientRooms = patientRooms;
  }
};
