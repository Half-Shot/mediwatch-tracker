import getters from './getters';
import actions from './actions';
import mutations from './mutations';
const Matrix = require("matrix-js-sdk");
const client = Matrix.createClient({
    baseUrl: (localStorage.getItem('mx_url')) ? localStorage.getItem('mx_url') : "https://104.248.165.185"
})
const state = {
  mx_accesstoken: (localStorage.getItem('mx_accesstoken')) ? localStorage.getItem('mx_accesstoken') : null,
  mx_userId: (localStorage.getItem('mx_userId')) ? localStorage.getItem('mx_userId') : null,
  mx_url: (localStorage.getItem('mx_url')) ? localStorage.getItem('mx_url') : null,
  profile: {},
  client: client
};

export default {
  state,
  getters,
  actions,
  mutations
};
