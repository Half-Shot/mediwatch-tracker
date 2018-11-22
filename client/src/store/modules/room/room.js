import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  items: [{
      id: 45678,
      type: 'conversation',
      title: 'John Doe',
      avatar: ''
    },
    {
      id: 45670,
      type: 'medicalInfo',
      title: 'cardiographical',
      avatar: ''
    },
    {
      id: 45678,
      type: 'medicalInfo',
      title: 'weight',
      avatar: ''
    }
  ]
};

export default {
  state,
  getters,
  actions,
  mutations
};