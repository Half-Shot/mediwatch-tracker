import * as types from "@/store/types";

export default {
  roomSet: state => {
    return state.roomSet;
  },
  patients: state => {
    return state.patientRooms;
  },
  patientList: state => {
    return state.patientList;
  },
  getAll: state => {
    return state.items;
  },
  get: (state, id) => {
    return state.rooms;
  },
  invitesCount: (state, id) => {
    return state.invites.length;
  },
  invites: (state, id) => {
    return state.invites;
  }
};
