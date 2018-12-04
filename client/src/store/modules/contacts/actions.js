import * as types from "@/store/types";
import Vue from "vue";

export default {
  async search({
    state,
    commit,
    dispatch
  }, data) {
    return await this.getters["auth/client"].searchUserDirectory({
      term: data,
      limit: 3
    });
  },
  async add({
    state,
    commit,
    dispatch
  }, user) {
    let contacts = state.contacts;
    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i].user_id == user.user_id) {
        Vue.notify({
          group: "foo",
          text: `You've already added ${user.display_name} to your contacts.`,
          type: "warning"
        });

        return Promise.reject();
      }
    }
    if (user.user_id != this.getters["auth/userId"]) {
      contacts.push(user);

      user.avatar_url = user.avatar_url ?
        await this.getters["auth/client"].mxcUrlToHttp(
          user.avatar_url,
          64,
          64,
          "scale"
        ) :
        null;

      const res = await this.getters["auth/client"].setAccountData("contacts", {
        contacts: contacts
      });
      Vue.notify({
        group: "foo",
        text: `Successfully added ${user.display_name} to your contacts.`,
        type: "success"
      });
      return Promise.resolve();
    } else {
      Vue.notify({
        group: "foo",
        text: "Can't add yourself to your contacts",
        type: "error"
      });
      return Promise.reject();
    }
  },

  async remove({
    state,
    commit,
    dispatch
  }, user) {

    let contacts = state.contacts;

    let element = null;
    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i].user_id == user.user_id) {
        element = i;
      }
    }
    if (element != null) {
      contacts.splice(element, 1);
      this.getters["auth/client"].getRooms().forEach(room => {
        this.getters["auth/client"].kick(room.roomId, user.user_id);
      });

      const res = await this.getters["auth/client"].setAccountData("contacts", {
        contacts: contacts
      });
      commit("SET_CONTACTS", contacts);
      Vue.notify({
        group: "foo",
        text: `You've removed ${user.display_name} from your contacts.`,
        type: "success"
      });
      return Promise.resolve();
    } else {
      Vue.notify({
        group: "foo",
        text: "Can't find user.",
        type: "error"
      });
      return Promise.reject();
    }
  },
  async get({
    state,
    commit,
    dispatch
  }, data) {
    let contacts = await this.getters["auth/client"].getAccountData("contacts");
    if (contacts) {
      commit("SET_CONTACTS", contacts.event.content.contacts);
    }
  }
};