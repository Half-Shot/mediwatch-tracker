import * as types from "@/store/types";

export default {
  roomSet: state => {
    return state.roomSet;
  },
  patients: state => {
    return state.patientRooms;
  },
  getAll: state => {
    return state.items;
  },
  get: (state, id) => {
    return state.rooms;
  },
  invites: (state, id) => {
    return state.invites;
  }
};
