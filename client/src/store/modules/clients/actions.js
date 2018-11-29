import * as types from '@/store/types';


const STATE_TYPE_TYPE = "me.webres.medical.roomtype";
const MEDICAL_LOG_TYPE = `${STATE_TYPE_TYPE}.medicallog`;
const MEDICAL_INFO_TYPE = `${STATE_TYPE_TYPE}.medicalInfo`;


export default {
  async search({
    state,
    commit,
    dispatch
  }, data) {
    return await this.getters['auth/client'].searchUserDirectory({term: data, limit: 3})
  }
};
