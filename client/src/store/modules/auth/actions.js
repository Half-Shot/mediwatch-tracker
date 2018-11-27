import * as types from '@/store/types';
const Matrix = require("matrix-js-sdk");
import router from '../../../router';
import Vue from 'vue'

export default {
  async login({
    state,
    commit,
    dispatch
  }, data) {
    let autologin = false;
    if (!data) {
      autologin = true;
      data = {
        url: state.mx_url
      };
    }

    commit('SET_CLIENT', Matrix.createClient({
      baseUrl: data.url || state.mx_url,
      userId: state.mx_userId,
      accessToken: state.mx_accesstoken,
    }))


    state.client.on("sync", (curr, previous) => {
      console.log(curr, previous);
      commit('SET SYNC STATUS', curr);
    })

    if (autologin && !state.mx_accesstoken) {
      return;
    }

    if (autologin) {
      commit('SET SYNC STATUS', 'WAITING');
      state.client.startClient();
      return;
    }

    try {
      let res = await state.client.loginWithPassword(data.username, data.password);
      commit('SET SYNC STATUS', 'WAITING');
      state.client.startClient();

      res.url = data.url;

      await commit('LOGIN', res);
      router.push({
        name: 'setup'
      });

      return Promise.resolve(res);
    } catch (ex) {

      Vue.notify({
        group: 'foo',
        text: ex.data.error,
        type: 'error'
      })

      state.client = null;
      console.error("Failed to login:", ex);
      return ex;
    }

    // return commit('LOGIN', data);

  },
  async register({
    state,
    commit,
    dispatch
  }, data) {

    commit('SET_CLIENT', Matrix.createClient({
      baseUrl: data.url,
    }))

    state.client.on("sync", (sycnState) => {
      commit('SET SYNC STATUS', sycnState);
    });

    try {
      const res = await state.client.register(data.username, data.password, null, {
        "type": "m.login.dummy"
      });
      res.url = data.url;
      // state.client.startClient();
      // await commit('LOGIN', res);
      router.push({
        name: 'login'
      });
      Vue.notify({
        group: 'foo',
        text: 'Successfully created your account. Please log in.',
        type: 'success'
      })
      return Promise.resolve(res);
    } catch (ex) {

      Vue.notify({
        group: 'foo',
        text: ex.data.error,
        type: 'error'
      })
      state.client = null;
      console.error("Failed to login:", ex);
      return ex;
    }

    // return commit('LOGIN', data);

  },

  async setRole({
    state,
    commit,
    dispatch
  }, data) {

    // commit('SET_CLIENT', Matrix.createClient({
    //   baseUrl: state.mx_url
    // }))


    try {
      const res = await state.client.setAccountData('role', {
        "role": data.role
      });
      //res.url = data.url;

      //await commit('LOGIN', res);
      router.push({
        name: 'setup'
      });

      return Promise.resolve(res);
    } catch (ex) {

      Vue.notify({
        group: 'foo',
        text: ex.data.error,
        type: 'error'
      })
      //state.client = null;
      console.error("Failed to set role:", ex);
      return ex;
    }

    // return commit('LOGIN', data);

  },


  async setDisplayName({
    state,
    commit,
    dispatch
  }, data) {

    try {
      const res = await state.client.setDisplayName(data);

      return Promise.resolve(res);
    } catch (ex) {
      console.error("Failed to set display name:", ex);
      return ex;
    }

  },
  async logout({
    state,
    commit,
    dispatch
  }, data) {
    console.log("User requested logout.");
    dispatch('unsetClient', true)
    commit('LOGOUT')
    commit('SET SYNC STATUS', undefined);
    router.push({
      name: "login"
    });
  },
  async getProfile({
    state,
    commit,
    dispatch
  }, data) {

    state.client.on('sync', async (syncState) => {
      if (syncState == "PREPARED") {
        const res = await state.client.getAccountData('role');
        commit('SET_ROLE', res.event.content.role)
      }
    })

    if (state.mx_userId) {
      const profile = await state.client.getProfileInfo(state.mx_userId);
      profile.avatar = profile.avatar_url ? state.client.mxcUrlToHttp(profile.avatar_url, 64, 64, "scale") : null;
      commit('SET_PROFILE', profile)

    } else {
      router.push({
        name: "login"
      });
    }

  },
  unsetClient({
    state,
    commit
  }, data) {
    commit('UNSET_CLIENT')

    if (state.client) {
      state.client.stopClient();
    }

    if (data) {
      window.localStorage.removeItem("mx_accesstoken");
      window.localStorage.removeItem("mx_userId");
      commit('CLEAR_MX_DATA');
      // Don't remove the URL because they might want that to log back in with.
    }
  }

};
