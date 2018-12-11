import * as types from "@/store/types";
import Vue from "vue";

const STATE_TYPE_TYPE = "me.webres.medical.roomtype";
const MEDICAL_LOG_TYPE = `${STATE_TYPE_TYPE}.medicallog`;
const MEDICAL_INFO_TYPE = `${STATE_TYPE_TYPE}.medicalInfo`;

const TYPE_TO_MX_TYPE = {
  medicallog: MEDICAL_LOG_TYPE,
  medicalInfo: MEDICAL_INFO_TYPE
};

const TYPE_TO_NAME = {
  medicallog: "Medical Log",
  medicalInfo: "Medical Information"
};

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
    const patients = {};
    console.log("Fetching rooms");
    let invites = [];
    let patientList = [];
    const ourName = this.getters["auth/client"].getUserId();
    let invite = false;
    this.getters["auth/client"].getRooms().forEach(room => {
      if (room.hasMembershipState(ourName, "invite")) {
        invite = true;
        const memberState = room.currentState.getStateEvents(
          "m.room.member"
        );
        if (memberState.length > 1) {
          for (var i = 0; i < memberState.length; i++) {
            if (ourName == memberState[i].event.state_key) {
              room.sender = this.getters["auth/client"].getUser(
                memberState[i].event.sender
              );
              invites.push(room);
            }
          }
        }
      }

      const creatorState = room.currentState.getStateEvents(
        "m.room.create"
      );

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
        room.members = {
          joined: [],
          invited: [],
        }
        room.members.joined = room.currentState.getMembers().filter((m) => m.membership === "join");
        room.members.invited = room.currentState.getMembers().filter((m) => m.membership === "invite");
        if (rType === MEDICAL_LOG_TYPE) {
          acctRooms.medicalLog = room;
        } else if (rType === MEDICAL_INFO_TYPE) {
          acctRooms.medicalInfo = room;
        }
        console.log(rType, room);
      } else {
        const patientUser = patients[creatorUser] || {};
        var hasUser = patientList.indexOf(creatorUser) > -1;
        if (!hasUser) {
          patientList.push(creatorUser);
        }
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
    commit("SET_ROOMS", acctRooms);
    commit("SET_INVITES", invites);
    commit("SET_PATIENT_ROOMS", patients);
    commit("SET_PATIENT_LIST", patientList);
  },
  create({
    state,
    commit,
    dispatch
  }, data) {
    const userId = this.getters["auth/client"].getUserId();
    const users = {};
    users[userId] = 100;
    return this.getters["auth/client"].createRoom({
      name: `Mediwatch ${TYPE_TO_NAME[data.type]}`,
      visibility: "private",
      initial_state: [{
          type: STATE_TYPE_TYPE,
          content: {
            type: TYPE_TO_MX_TYPE[data.type]
          }
        },
        {
          type: "m.room.power_levels",
          content: {
            users,
            users_default: 0,
            events: {
              "m.room.name": 50,
              "m.room.power_levels": 100,
              "m.room.history_visibility": 100,
              "m.room.canonical_alias": 100,
              "m.room.avatar": 100
            },
            events_default: 50,
            state_default: 50,
            ban: 100,
            kick: 100,
            redact: 100,
            invite: 100
          }
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
    return this.getters["auth/client"].invite(room.roomId, user);
  },
  join({
    state,
    commit,
    dispatch
  }, roomId) {
    Vue.notify({
      group: "foo",
      text: `Successfully attained permission.`,
      type: "success"
    });
    return this.getters["auth/client"].joinRoom(roomId);
  },
  reject({
    state,
    commit,
    dispatch
  }, roomId) {
    Vue.notify({
      group: "foo",
      text: `Successfully rejected invitation.`,
      type: "success"
    });
    return this.getters["auth/client"].leave(roomId);
  },
  bulkInvitations({
    state,
    commit,
    dispatch
  }, invitations) {
    var users = Object.keys(invitations);

    for (var i = 0; i < users.length; i++) {
      var rooms = Object.keys(invitations[users[i]]);
      for (var r = 0; r < rooms.length; r++) {
        if (invitations[users[i]][rooms[r]] == 1) {
          this.getters["auth/client"].invite(rooms[r], users[i]);
        } else {
          this.getters["auth/client"].kick(rooms[r], users[i]);
        }
      }
    }

    Vue.notify({
      group: "foo",
      text: `Successfully changed permissions.`,
      type: "success"
    });
    return Promise.resolve();
  },
  addToLog({
    state,
    commit,
    dispatch
  }, {
    room,
    body
  }) {
    return this.getters["auth/client"].sendTextMessage(room.roomId, body);
  }
};