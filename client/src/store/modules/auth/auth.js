import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
const state = {
  mx_accesstoken: localStorage.getItem("mx_accesstoken")
    ? localStorage.getItem("mx_accesstoken")
    : null,
  mx_userId: localStorage.getItem("mx_userId")
    ? localStorage.getItem("mx_userId")
    : null,
  mx_url: localStorage.getItem("mx_url")
    ? localStorage.getItem("mx_url")
    : null,
  profile: null,
  client: null,
  syncState: null,
  role: null
};

export default {
  state,
  getters,
  actions,
  mutations
};
