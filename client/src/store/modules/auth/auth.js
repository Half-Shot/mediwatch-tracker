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
  role: null,
  servers: [
    {
      name: "medical.webres.me",
      value: "https://medical.webres.me"
    },
    {
      name: "matrix.half-shot.uk",
      value: "https://matrix.half-shot.uk"
    },
    {
      name: "matrix.org",
      value: "https://matrix.org"
    }
  ]
};

export default {
  state,
  getters,
  actions,
  mutations
};
