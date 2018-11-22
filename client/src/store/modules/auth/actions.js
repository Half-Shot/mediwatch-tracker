import * as types from '@/store/types';
const Matrix = require("matrix-js-sdk");
import router from '../../../router';

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
    // if (state.client != null) {
    //   commit('SET_CLIENT', Matrix.createClient({
    //       baseUrl: data.url,
    //   }))
    // }
    commit('SET_CLIENT', Matrix.createClient({
      baseUrl: state.mx_url || data.url,
      userId: state.mx_userId,
      accessToken: state.mx_accesstoken,
    }))


    state.client.on("sync", (sycnState) => {
      commit('SET SYNC STATUS', sycnState);
    })

    if (autologin && !state.mx_accesstoken) {
      return;
    }

    if (autologin) {
      state.client.startClient();
      return;
    }

    try {
      let res = await state.client.loginWithPassword(data.username, data.password);

      state.client.startClient();

      res.url = data.url;

      await commit('LOGIN', res);
      router.push({
        name: 'dashboard'
      });

      return Promise.resolve(res);
    } catch (ex) {
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
      client.startClient();
      await commit('LOGIN', res);
      router.push({
        name: 'setup'
      });

      return Promise.resolve(res);
    } catch (ex) {
      alert(ex.data.error);
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
      //alert(ex.data.error);
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
    // const cli = await MatrixClientPeg.getClient();
    // XXX: Because will doesn't want to invalidate the token just yet, don't actually call logout.
    // We should do this once we have a login screen.
    // This removes the client from the Peg and deletes the tokens
    dispatch('unsetClient', true)
    commit('LOGOUT')
    router.push({name: "login"});
  },
  async getProfile({
    state,
    commit,
    dispatch
  }, data) {
    if (state.mx_userId) {
      state.client.on('sync', async (syncState) => {
        if (syncState == "PREPARED") {
          const res = await state.client.getAccountData('role');
          console.log(res);
        }
      })


      const profile = await state.client.getProfileInfo(state.mx_userId);
      profile.avatar = profile.avatar_url ? state.client.mxcUrlToHttp(profile.avatar_url, 64, 64, "scale") : null;
      console.log(profile);
      commit('SET_PROFILE', profile)
    }

    // this.profile.displayname = profile.displayname;
    // this.profile.avatar = profile.avatar_url ? cli.mxcUrlToHttp(profile.avatar_url, 64, 64, "scale") : null;
  },
  unsetClient({
    state,
    commit
  }, data) {
    commit('UNSET_CLIENT')

    if (data) {
      window.localStorage.removeItem("mx_accesstoken");
      window.localStorage.removeItem("mx_userId");
      commit('CLEAR_MX_DATA');
      // Don't remove the URL because they might want that to log back in with.
    }
  }

};