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
     try {
       const res = await state.client.loginWithPassword(data.username, data.password);
       state.mx_accesstoken = window.localStorage["mx_accesstoken"] = res.access_token;
       state.mx_userId =  window.localStorage["mx_userId"] = res.user_id;
       state.mx_url = window.localStorage["mx_url"] = data.url;

       router.push({name: 'dashboard'});

        return res;
     } catch (ex) {
         state.client = null;
         console.error("Failed to login:", ex);
         return ex;
     }

   }
};
