import * as types from '@/store/types';
const Matrix = require("matrix-js-sdk");
import router from '../../../router';

export default {
  async login({
    state,
    commit,
    dispatch
  }, data) {
    console.log(state.client);

    // if (state.client != null) {
    //   commit('SET_CLIENT', Matrix.createClient({
    //       baseUrl: data.url,
    //   }))
    // }
    commit('SET_CLIENT', Matrix.createClient({
      baseUrl: data.url,
    }))


    try {
      const res = await state.client.loginWithPassword(data.username, data.password);
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


    try {
      const res = await state.client.register(data.username, data.password);
      res.url = data.url;

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
    router.push('/login');
  },
  async getProfile({
    state,
    commit,
    dispatch
  }, data) {
    if (state.mx_userId) {
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