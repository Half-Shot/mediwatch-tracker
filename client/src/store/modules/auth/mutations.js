import * as types from '@/store/types';
import router from '../../../router'
export default {
  'SET_CLIENT' (state, data) {
    state.client = data
  },
  'UNSET_CLIENT'(state) {
    state.client = null
  },
  'CLEAR_MX_DATA'(state) {
    state.mx_accesstoken = null
    state.mx_userId = null
    state.profile = {}
  },
  'SET_PROFILE'(state, data){
    state.profile = data
  },
  async 'LOGIN'(state, data){
    state.mx_accesstoken = window.localStorage["mx_accesstoken"] = data.access_token;
    state.mx_userId =  window.localStorage["mx_userId"] = data.user_id;
    state.mx_url = window.localStorage["mx_url"] = data.url;
  },
  'LOGOUT'(state){
    state.profile = null
  },
  'SET_ROLE'(state,data){
    state.role = data
  },
  'SET SYNC STATUS'(state, data){
    console.log("Updating sync state", state.syncState, data);
    state.syncState = data;
  }
};
